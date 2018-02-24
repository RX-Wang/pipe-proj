#!/bin/bash
PROJ_PATH="$(pwd)"
PROJ_NAME="pipe-proj"
cd ${PROJ_PATH}
echo 'pulling from github'
git pull

mv ${PROJ_PATH}/config/index_prod.js ${PROJ_PATH}/config/index.js
if [ ! -d "${PROJ_PATH}/logs/" ];then
mkdir ${PROJ_PATH}/logs/
fi
npm i
pm2 stop ${PROJ_NAME}
pm2 delete ${PROJ_NAME}
pm2 start ${PROJ_PATH}/bin/www
