# !/bin/bash
NAME="mysql"
MYSQL_ROOT_PASSWORD="123456"

while getopts "n:p" arg
do
  case $arg in
    n)
      NAME=$OPTARG
      ;;
    p)
      MYSQL_ROOT_PASSWORD=$OPTARG
      ;;
    ?)
      exit 1
      ;;
  esac
done

rm -rf data
mkdir data

docker run -d --name $NAME \
  -p 3306:3306 \
  -v $PWD/data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci