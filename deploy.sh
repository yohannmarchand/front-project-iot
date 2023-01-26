ssh -A -t pi@172.20.10.6 "
   cd ~/code/front-project-iot
   sudo rm -r /home/website/dist
   git checkout main
   git pull
   yarn install
   yarn generate
   sudo mv ./dist /home/website
"
