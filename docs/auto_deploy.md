# Настройка автоматического deploy'я через GitGub
1. Создание SHH ключи
2. Приватный добавить в github репозиторий `settings -> secrets and variables -> actions`, ключ нужно создать с названием `SSH_PRIVATE_KEY`
3. Добавить публичный ключ на хостинг

Далее необходимо сделать push или pull request в ветку main