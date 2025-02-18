# Стек технологий:
1. FastAPI + Python
2. HTMX + Jinja
3. JSON-LD
4. Venv
5. Uvicorn + Nginx
6. Docker
7. Github actions (CI/CD)
8. TG API

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
1. Все шаблоны разделены на логические блоки - `templates/blocks`
2. Блоки собираются в страницы `templates/<index.html / ptice.html>` при помощи Jinja

## Отправка формы
1. Реализация отправки формы - `app.py`
```
@app.post("/send", response_class=HTMLResponse)
```
2. Форма - `templates/blocks/form.html`
3. Доп сприпты для работы формы - `static/scripts/clearForm.js`
Форма отправляется в tg чат, при помощи tg бота


## Реализация микроразметки для улучшения СЕО
Для реализации микроразметки выбор пал на JSON-LD
1. Метаданные - `meta/meta.py`
2. Пример использования -
```
<script type="application/ld+json">
    {{ {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": site_name,
        "url": site_url,
        "description": site_description
    } | tojson }}
</script>
```