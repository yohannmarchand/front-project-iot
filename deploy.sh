ssh -A -t pi@172.20.10.6 "
   kill -9 $(pgrep -f yarn)
   kill -9 $(lsof -t -i :3000)
   cd ~/code/front-project-iot
   git checkout main
   git pull
   yarn build
   yarn start
"
