from email.message import EmailMessage
from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
import uvicorn
from meta.meta import mainPageMeta
from data.services import services
from data.job import job
from data.price import price_data, price_data_2
import aiosmtplib
import logging
import os
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_LOGIN = os.getenv("SMTP_LOGIN")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_EMAIL_TO = os.getenv('SMTP_EMAIL_TO')

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, **mainPageMeta})

@app.get("/price", response_class=HTMLResponse)
async def price(request: Request):
    return templates.TemplateResponse("price.html", {
        "request": request,
        "price": price_data,
        "price_2": price_data_2
    })

@app.post("/send")
async def send(name: str = Form(...), phone: str = Form(...)):
    email_content = f"""
    <h2>Новая заявка с сайта</h2>
    <p><strong>Имя:</strong> {name}</p>
    <p><strong>Телефон:</strong> {phone}</p>
    """

    message = EmailMessage()
    message["From"] = SMTP_LOGIN
    message["To"] = SMTP_EMAIL_TO
    message["Subject"] = "Новая заявка с сайта"
    message.set_content(email_content, subtype="html")

    try:
        logging.info(f"Отправка письма на {message['To']}...")
        await aiosmtplib.send(
            message,
            hostname=SMTP_SERVER,
            port=SMTP_PORT,
            username=SMTP_LOGIN,
            password=SMTP_PASSWORD,
            use_tls=True,
        )
        logging.info("Письмо успешно отправлено!")
        return {"status": "success", "message": "Письмо успешно отправлено!"}
    except Exception as e:
        logging.error(f"Ошибка отправки письма: {e}")
        return {"status": "error", "message": f"Ошибка отправки: {e}"}

@app.get('/privacy')
async def privacy():
    return 'Privacy file'

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

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)