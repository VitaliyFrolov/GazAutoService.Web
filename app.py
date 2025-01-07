from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from meta.meta import mainPageMeta


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