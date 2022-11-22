# Simple Todo list APIs

I assume that todo service is in another repo (ref. `./assume-micro-service`). It will be called by API gateway (`./apigw`).

## Features

- [x] Todo service
  - [x] microservice
  - [x] Create todo task
  - [x] Delete todo task
  - [x] Update todo task
  - [x] Set priority
  - [x] Task status
- [x] Middleware/Gateway
- [x] ~~In memory~~ Cache in file

## Usage

Now I prepare the services for DEV env only :

```sh
docker-compose -f docker-compose.dev.yml down -v && \
docker-compose -f docker-compose.dev.yml up --build
```

## APIs

### Todo's APIs

Including :

- Create task
- Get all tasks
- Get task by ID
- Update task by ID
- Remove task by ID
- Remove all tasks

You can try via Postman script [here](./examples/postman/Todo.postman_collection.json).

### Healthcheck

- Gateway

  ```sh
  curl --location --request GET 'http://localhost:8580/healthz'
  ```

  Output :

  ```json
  {
      "status": 200,
      "error": null,
      "data": "Gateway is OK"
  }
  ```

- Todo

  ```sh
  curl --location --request GET 'http://localhost:8580/todo/healthz'
  ```

  Output :

  ```json
  {
      "status": 200,
      "error": null,
      "data": "Todo service is OK"
  }
  ```
