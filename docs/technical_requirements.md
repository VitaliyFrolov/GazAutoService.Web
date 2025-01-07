# Стек технологий:
1. FastAPI + Python
2. HTMX + Jinja
3. JSON-LD
4. Venv
5. Uvicorn
6. Docker

# Технические требования
## 1. Реализовать core функционал приложения, позволяющий поднимать вебсервер и отдавать данные пользователю
Для данной реализации был взят язык программирования python и фреймворк FastAPI.
```
app = FastAPI()
```
Cоздает экземпляр приложения
```
app.mount("/static", StaticFiles(directory="static"), name="static")
```
Hеализовывает роут `/static`, позволяющий отдавать статику для работоспособности сайта
```
templates = Jinja2Templates(directory="templates")
```
Позволяет получить доступ нашему приложения к HTML шаблонам, для отображения их на сайте
```
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, **mainPageMeta})
```
Пример реализации роута отдающего готовую страницу

**Логика расположена в файле app.py**

## Сборка HMTL шаблонов

## Отправка формы

## Реализация микроразметки для улучшения СЕО
Для реализации микроразметки выбор пал на JSON-LD