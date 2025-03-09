from email.message import EmailMessage
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, HTMLResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
import uvicorn
from meta.meta import mainPageMeta
from data.services import services
from data.job import job
from data.price import price_data
import logging
import os
from dotenv import load_dotenv
import aiofiles
from aiogram import Bot

load_dotenv()

TG_BOT_TOKEN = os.getenv("TG_BOT")
TG_CHAT_ID = int(os.getenv("TG_CHAT_ID"))

app = FastAPI()

bot = Bot(token=TG_BOT_TOKEN)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        **mainPageMeta,
        "price": price_data,
    })

@app.get("/yandex_30e143609917faca.html", response_class=HTMLResponse)
async def get_yandex_file():
    file_path = os.path.join("templates", "yandex_30e143609917faca.html")
    
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        return HTMLResponse("<p>Файл не найден</p>", status_code=404)

@app.get("/price-content", response_class=HTMLResponse)
async def price_content(tab: str):
    items = price_data["items"].get(tab, [])
    
    if not items:
        return "<p>Данные отсутствуют</p>"

    html_content = "".join(
        f"""
        <div class="price__item">
            <h3 class="price__item-title">{item["title"]}</h3>
            <p class="price__item-price">{item["price"]} руб.</p>
            <p class="price__item-subtitle">{item["subtitle"]}</p>
        </div>
        """
        for item in items
    )

    return f"<div class='price__items'>{html_content}</div>"

@app.post("/send", response_class=HTMLResponse)
async def send(name: str = Form(...), phone: str = Form(...)):
    text = f"📩 *Новая заявка с сайта*\n\n👤 *Имя:* {name}\n📞 *Телефон:* {phone}"
    
    try:
        await bot.send_message(chat_id=TG_CHAT_ID, text=text, parse_mode="Markdown")
        return "<p class='success-message'>Заявка успешно отправлена!</p>"
    
    except Exception as e:
        logging.error(f"Ошибка отправки в Telegram: {e}")
        return "<p class='error-message'>Произошла ошибка, попробуйте позже</p>"


@app.get('/privacy', response_class=PlainTextResponse)
async def privacy():
    file_path = "static/privacy/privacy.txt"
    try:
        async with aiofiles.open(file_path, mode="r", encoding="utf-8") as file:
            content = await file.read()
        return PlainTextResponse(content, media_type="text/plain")
    except FileNotFoundError:
        return PlainTextResponse("Файл политики конфиденциальности не найден", status_code=404)

@app.get("/services-list", response_class=HTMLResponse)
async def get_services_list():
    html = "".join(
        f"""
        <li class="services__item" hx-get="/service-content/{index}" 
            hx-target=".services__content > div" 
            hx-swap="innerHTML">
            {service['title']}
        </li>
        """
        for index, service in enumerate(services)
    )
    return f"<ul class='services__list'>{html}</ul>"

@app.get("/service-content/{index}", response_class=HTMLResponse)
async def get_service_content(index: int):
    if 0 <= index < len(services):
        service = services[index]
        title = service['title']
        content = service.get('content', 'Описание отсутствует.')
        return f"""
        <h3 class="services__content-title">{title}</h3>
        <p class="services__content-text">{content}</p>
        """
    return "Контент не найден", 404

@app.get("/job-list", response_class=HTMLResponse)
async def job_list():
    html = "".join(
        f"""
        <li class="vacancies__item">
            <h3 class="vacancies__title">{job_item['title']}</h3>
            <div class="vacancies__item-content">
                {"".join(
                    f"""
                    <h4 class="vacancies__content-title">{section['title']}</h4>
                    <ul class="vacancies__content-list">
                        {''.join(f'<li>{item}</li>' for item in section['list'])}
                    </ul>
                    """
                    for section in job_item['content']
                )}
            </div>
        </li>
        """
        for job_item in job
    )
    return f"<ul class='vacancies__list'>{html}</ul>"


@app.get("/job-content/{index}", response_class=HTMLResponse)
async def job_content(index: int):
    if 0 <= index < len(job):
        job_item = job[index]
        content_html = "".join(
            f"""
            <h4 class="vacancies__content-title">{section['title']}</h4>
            <ul class="vacancies__content-list">
                {''.join(f'<li>{item}</li>' for item in section['list'])}
            </ul>
            """
            for section in job_item['content']
        )
        return f"""
        <div class="vacancies__details">
            <h3 class="vacancies__title">{job_item['title']}</h3>
            {content_html}
        </div>
        """
    return "Вакансия не найдена", 404

@app.get("/sub-tabs", response_class=HTMLResponse)
async def get_sub_tabs(main_tab: str):
    """Возвращает вложенные табы (типы ремонта) для выбранной модели"""
    items = price_data.get("items", {})

    logging.info(f"Получен main_tab: '{main_tab}'")
    logging.info(f"Доступные ключи: {list(items.keys())}")

    if main_tab not in items:
        logging.error(f"main_tab '{main_tab}' не найден в price_data")
        return "<p>Нет данных</p>"

    sub_tabs = [item["title"] for item in items[main_tab] if "title" in item]

    if not sub_tabs:
        return "<p>Нет данных</p>"

    html = "".join(
        f'<li class="sub-tab" data-subtab="{sub_tab}">{sub_tab}</li>'
        for sub_tab in sub_tabs
    )

    return f"<ul class='sub-tabs'>{html}</ul>"


@app.get("/services", response_class=HTMLResponse)
async def get_services(main_tab: str, sub_tab: str):
    """Получаем все данные по выбранной модели и подкатегории"""
    logging.info(f"Получен запрос: main_tab={main_tab}, sub_tab={sub_tab}")
    items = price_data.get("items", {})

    if main_tab not in items:
        logging.error(f"Не найден main_tab: {main_tab}")
        return "<p>Нет данных</p>"

    services = []
    for category in items[main_tab]:
        if isinstance(category, dict) and category.get("title") == sub_tab:
            for sub_category in category.get("items", []):
                if sub_category.get("service"):
                    services.append(sub_category)

    if not services:
        logging.error(f"Не найдено услуг для main_tab={main_tab} и sub_tab={sub_tab}")
        return "<p>Нет данных</p>"

    html = "".join(
        f"""
        <li class="price-content__item">
            <p class="price-content__name">{service.get("service", "")}</p>
            <p class="price-content__price">{service.get("price", "0")} руб.</p>
        </li>
        """
        for service in services
    )

    return f"<ul class='price-content__list'>{html}</ul>"

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)