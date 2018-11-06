#!/bin/bash 

# Variaveis de ambiente usadas neste script
# export DB_HOST=postgres \
# export DB_PORT=5432 \
# export DB_USER=picpay \
# export DB_NAME=picpay \
# export PGPASSWORD=picpay \
# export SET_USERS='true' \
# export SET_PRIORITY='true' \
# export CREATE_DATABASE='true'

echo $DB_HOST
echo $DB_PORT
echo $DB_USER
echo $DB_NAME
echo $PGPASSWORD
echo $SET_USERS
echo $SET_PRIORITY
echo $CREATE_DATABASE


# verifing and downloading users.csv
FILE_EXISTS=$(ls | grep users.csv)
if [ ! $FILE_EXISTS ]
then
  echo -e "\e[34mBaixando csv, por favor, aguarde...\e[0m"
  wget -c https://s3.amazonaws.com/careers-picpay/users.csv.gz -O users.csv.gz
  echo -e "\e[34mDescompactando arquivo...\e[0m"
  gunzip users.csv.gz
fi

# creating database
if [[ ${CREATE_DATABASE} = 'true' ]]
then
  echo -e "\e[34mCriando banco de dados, por favor, aguarde...\e[0m"
  psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
  -f database.sql > log.txt
fi

# creating users
if [[ ${SET_USERS} = 'true' ]]
then
  echo -e "\e[34mPopulando banco de dados, isto deve demorar alguns minutos...\e[0m"
  psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
  -c "\copy \"user\" (id,name,username) from users.csv DELIMITERS ',' CSV;"
fi

# setting priorities
if [[ ${SET_PRIORITY} = 'true' ]]
then 
  echo -e "\e[34mAtualizando prioridades, por favor, aguarde...\e[0m"
  FILE=./priority/lista_relevancia_1.txt
  while read ID; do
    psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
    -c "UPDATE public.\"user\" SET priority=1 WHERE id = '$ID';" > log.txt
  done < $FILE
  echo -e "\e[34mAtualizando prioridades dos usuários da lista 2, aguarde...\e[0m"
  FILE=./priority/lista_relevancia_2.txt
  while read ID; do
    psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} \
    -c "UPDATE public.\"user\" SET priority=2 WHERE id = '$ID';" > log.txt
  done < $FILE
fi