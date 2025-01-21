```bash
< PROJECT ROOT >
   |
   |-- .github/
   |    |-- ci.yaml                         # Настройка CI для GitHub
   | 
   |-- certs/                               # SSL сертификаты
   |                        
   |-- data/
   |    |-- job.py                          # Данные о вакансиях
   |    |-- price.py                        # Данные о ценах
   |
   |-- docs/                                # Документация
   |-- meta/
   |    |-- meta.py                         # Мета информация для реализации микроразметки
   |
   |-- nginx/                               # Конфиг прокси nginx 
   |
   |-- static/                              # Статические файлы
   |    |-- <JS, CSS, images>               # JavaScript файлы, CSS файлы и иконки
   |
   |-- templates/                           # HTML шаблоны
   |    |-- mixins/                         # Миксины для переиспользуемых HTML блоков
   |    |-- blocs/                          # Блоки для HTML шаблонов
   |
   |-- app.py                               # Файл с логикой приложения
   |
   |-- .dockerignore                        # Список файлов, не входящих в Docker контейнер
   |-- Dockerfile                           # Реализация Docker контейнера
   |-- docker-compose.yml                   # Компос для Dockerfile
   |
   |-- Makefile                             # Файл для запуска скриптов
   |
   |-- requirements.txt                     # Список зависимостей
```