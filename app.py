from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request


app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/info", response_class=HTMLResponse)
async def read_info(request: Request):
    return templates.TemplateResponse("info.html", {"request": request})

@app.post("/send")
async def send(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    # Здесь добавьте логику для отправки электронного письма или любой другой обработки
    return f'Письмо от {name} успешно отправлено!'