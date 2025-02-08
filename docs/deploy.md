# Deploy
### Для успешного деплоя на удаленный сервер с операционной системой Ubuntu 22.04 необходимо:
1. Подключиться к серверу: 
```
ssh <username>@<remote_server_ip>
```
2. Обновить пакеты:
```
sudo apt update
sudo apt upgrade -y
```
3. Установка доп пакетов
```
sudo apt install curl software-properties-common ca-certificates apt-transport-https -y
```
4. Добавление GPG-ключа Docker
```
    wget -O- https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor | sudo tee /etc/apt/keyrings/docker.gpg > /dev/null
```
5. Добавление репозитория Docker
```
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable"| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
6. Проверяем репозиторий
```
sudo apt-cache policy docker-ce
```
7. Установка Docker
```
sudo apt install docker.io
```
8. Проверяем
```
sudo systemctl status docker
```
9. Устанавливаем docker-compose
```
sudo apt-get install docker-compose
```
10. Установка make
```
sudo apt install make
```

`make build-up` - для запуска проекта