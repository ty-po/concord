# README

https://medium.com/@dakota.lillie/using-action-cable-with-react-c37df065f296

https://guides.rubyonrails.org/api_app.html

https://www.engineyard.com/blog/rails-encrypted-credentials-on-rails-5.2

# Setup

- Use RVM to install rails 2.3.3
- bundle install
- setup auth secrets (or dont)
- hostname/ip configuration
- rake db:migrate

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
- docker-compose run web rake db:create
- docker-compose run web rake db:migrate


# TODO

- ~Create User Model~
- ~Implement JWT Authentication/session~
- ~self signed ssl~
- ~Functionalize login so it can be extended to different providers easier~
- Testing for login stuffs
- Database constraints/model tests or whatever its called in ruby for uniqueness of username and uid++provider
- ActionCable frameworking
- wss support in nginx
