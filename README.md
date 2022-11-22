# Simple Todo list APIs

I assume that todo service is in another repo (ref. `./assume-micro-service`). It will be called by API gateway (`./apigw`).

## Features

- [ ] Todo service
  - [x] microservice
  - [ ] Create todo task
  - [ ] Delete todo task
  - [ ] Update todo task
  - [ ] Set priority
- [x] Middleware/Gateway
- [ ] In memory

## Usage

Now I prepare the services for DEV env only :

```sh
docker-compose -f docker-compose.dev.yml down -v && \
docker-compose -f docker-compose.dev.yml up --build
```
