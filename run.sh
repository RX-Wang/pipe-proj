#!/bin/bash
PROJ_PATH="$(pwd)"
PROJ_NAME="pipe-proj"
mv PROJ_PATH/config/index_prod.js PROJ_PATH/config/index.js
pm2 stop PROJ_NAME
pm2 delete PROJ_NAME
pm2 start PROJ_PATH/bin/www
