# Ops
Global npm packages

npm install yarn -g

created using https://www.npmjs.com/package/create-vue-app

# Kubernetes Setup

- https://skaffold.dev/docs/quickstart/
- `minikube start`
- `skaffold dev`

# Docker Setup

### GCP

- Compute Engine > Create a new,  Make a new instance (weve been using n1-standard-1)
- Container Optimized OS, enable http/https
- Network > VPC Network, create a new rule for tag `docker` with tcp `3000, 8080`
- get on it, clone repo
- https://cloud.google.com/community/tutorials/docker-compose-on-container-optimized-os heading Making an alias to Docker Compose


### Windows

- On windows honestly a disaster
- install docker for windows (enable virtualization and hyper v (if you have it if not set up vbox))
- ???install minikube maybe???
- set up WSL cause yes please linux shell
- change wsl conf to mount windows drives at /c instead of /mnt/c cause docker expects it
- install https://github.com/goreliu/wsl-terminal for solarized and nice fonts
- get fix for wsl-terminal for the updated mount location (https://github.com/goreliu/wsl-terminal/issues/129#issue-368287028)
- *in wsl terminal from this point*
- install docker
- install docker-compose
- ???install probably some interface for minikube???
- go to a path inside of /c/ (i use /c/dev/)
- git clone this

### Docker compose steps

- make a private/public key pair for ssh, rename public key to `authorized_keys` and place in `./vm`
- set your external host name (localhost if you're running locally. your external IP or domain if on GCP) with `export CONCORD_EXTERNAL_HOST="localhost"` 
- docker-compose build
- either copy ruby/config/master.key in or set up a new secrets file using this command `()()()` with this format: ()()()
- docker-compose up
- docker-compose run api rake db:create
- docker-compose run api rake db:migrate

- ssh into your external ip at port 2222 to get into your development instance of debian

# Prod

- command for vue is `yarn prod`
- command for rails is `rails server -e production`

# TODO

- wds server port forwarding
- auth setup for ruby credentials (probably incant the edit function and do it manually)
- route two containers together when in dev mode
- make current "prod" deploy from containter//gitops
