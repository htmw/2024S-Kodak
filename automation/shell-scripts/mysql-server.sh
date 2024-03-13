#!/bin/bash

# Update system 
apt update -y
# Install mysql
apt install mysql-server -y
Check the status of mysql
systemctl status mysql

# Update mysql-server password
password='mysql@1234'
mysql -u root --execute "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql@1234';"

# Create database
mysql -u root -p$password --execute "CREATE DATABASE kodakdb;" 

# Replacing bind-address to allow external connections
sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

mysql -u root -p$password --execute "CREATE USER 'mysql-dev-admin'@'%' IDENTIFIED WITH mysql_native_password BY 'dev-admin01';  GRANT ALL ON *.* TO 'mysql-dev-admin'@'%' ; FLUSH PRIVILEGES;"

systemctl restart mysql

 