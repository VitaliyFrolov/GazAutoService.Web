```bash
< PROJECT ROOT >
   |
   |-- .github/
   |    |-- ci.yaml                         # Настройка CI для GitHub
   |                         
   |-- data/
   |    |-- job.py                          # Данные о вакансиях
   |    |-- price.py                        # Данные о ценах
   |
   |-- docs/                                # Документация
   |-- meta/
   |    |-- meta.py                         # Мета информация для реализации микроразметки
   |
   |-- static/                              # Статические файлы
   |    |-- <JS, CSS, images>               # Java Scripts файлы CSS файлы и иконки
   |
   |-- templates/                           # HTML шаблоны
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