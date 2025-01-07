# Deploy
### Для успешного деплоя на удаленный сервер с операционной системой Ubuntu необходимо:
1. Подключиться к серверу: 
```
ssh <username>@<remote_server_ip>
```
2. Обновить пакеты:
```
sudo apt update
sudo apt upgrade -y
```
3. Установка необходимых зависимостей:
```
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```
4. Добавление GPG-ключа Docker
```
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
5. Добавление репозитория Docker
```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```
6. Установка Docker
```
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```
7. Проверка Docker
```
sudo systemctl start docker
sudo systemctl enable docker
docker --version
```
8. Установка Docker Compose
```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version
```
9. Запустить приложение через Makefile
```
make build-start
```