ssh -A -t pi@172.20.10.6 "
   cd ~/code/front-project-iot
   rmdir -f /home/website/dist
   git checkout main
   git pull
   yarn generate
   sudo mv ./dist /home/website
"
