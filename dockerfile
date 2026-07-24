# Imagem oficial do PHP com Apache
FROM php:8.2-apache

# Diretório padrão do Apache
WORKDIR /var/www/html

# Copia todos os arquivos do projeto para dentro do container
COPY . /var/www/html/

# Cria a pasta de dados e ajusta permissões para o usuário do Apache (www-data)
RUN mkdir -p /var/www/html/data && \
    chown -R www-data:www-data /var/www/html/data && \
    chmod -R 775 /var/www/html/data

# Porta padrão do Apache
EXPOSE 80