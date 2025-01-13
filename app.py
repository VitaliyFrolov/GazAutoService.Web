from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
import uvicorn
from meta.meta import mainPageMeta
from data.services import services


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, **mainPageMeta})

@app.get("/about", response_class=HTMLResponse)
async def read_info(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})

@app.post("/send")
async def send(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    print(f"Письмо отправлено от {name}, email: {email}, сообщение: {message}")
    return {"status": "success", "message": f"Письмо от {name} успешно отправлено!"}

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

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)