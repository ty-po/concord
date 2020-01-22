Global npm packages

npm install yarn -g

created using https://www.npmjs.com/package/create-vue-app

# Docker Setup

- On windows honestly a disaster
- install docker for windows (enable virtualization and hyper v (if you have it if not set up vbox))
- ???install minikube maybe???
- set up WSL cause yes please linux shell
- change wsl conf to mount windows drives at /c instead of /mnt/c cause docker expects it
- install https://github.com/goreliu/wsl-terminal for solarized and nice fonts
- get fix for wsl-terminal for the updated mount location (https://github.com/goreliu/wsl-terminal/issues/129#issue-368287028)


- in wsl terminal from this point
- install docker
- install docker-compose
- ???install probably some interface for minikube???
- go to a path inside of /c/ (i use /c/dev/)
- git clone this


- docker-compose build
- on host machine set $RAILS_MASTER_KEY to contents of config/master.key
- docker-compose up
- docker-compose run api rake db:create
- docker-compose run api rake db:migrate

