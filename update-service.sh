#! /bin/bash
#https://lifesaver.codes/answer/how-do-i-call-pm2-to-check-if-a-process-with-given-name-is-running

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

pwd
source .env

git pull
npm install
npm run static

app="$APP_NAME:$SERVER_PORT"
echo "APP_NAME:$app"

pm2 describe $app > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start
else
  pm2 restart $app
fi;
