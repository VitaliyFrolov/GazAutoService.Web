#!/bin/bash

# Вкрипт для удаления лишний префиксов в файлах
read -p "Введите префикс для удаления: " prefix

if [ -z "$prefix" ]; then
  echo "Префикс не должен быть пустым."
  exit 1
fi

find . -type f -name "${prefix}*" | while IFS= read -r file; do
  filename=$(basename "$file")

  newname="${filename#$prefix}"

  newpath="$(dirname "$file")/$newname"

  mv "$file" "$newpath"
  echo "Переименовано: $file → $newpath"
done

echo "Удаление префикса завершено."