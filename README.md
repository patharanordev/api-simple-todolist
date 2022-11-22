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

Including:

- Create task
- Get all tasks
- Get task by ID
- Update task by ID
- Remove task by ID
- Remove all tasks

<details>
<summary>POST - /todo/task</summary>

### Create task

Body:

```json
{
    "task": "develop todo api", 
    "status": "todo", 
    "priority": 0
}
```

Response :

```json
{
    "status": 200,
    "error": null,
    "data": {
        "task": "test",
        "status": "in progress",
        "priority": 1,
        "1669102768533": {
            "task": "test",
            "status": "in progress",
            "priority": 1
        },
        "1669102769114": {
            "task": "test",
            "status": "in progress",
            "priority": 1
        },
        "1669103816619": {
            "task": "develop todo api",
            "status": "todo",
            "priority": 0
        }
    }
}
```

</details>


<details>
<summary>GET - /todo/task?mode=all</summary>

### Get all tasks

Response :

```json
{
    "status": 200,
    "error": null,
    "data": {
        "task": "test",
        "status": "in progress",
        "priority": 1,
        "1669102768533": {
            "task": "test",
            "status": "in progress",
            "priority": 1
        },
        "1669102769114": {
            "task": "test",
            "status": "in progress",
            "priority": 1
        },
        "1669103816619": {
            "task": "develop todo api",
            "status": "todo",
            "priority": 0
        }
    }
}
```

</details>

<details>
<summary>GET - /todo/task?id=1669103816619</summary>

### Get task by ID

Response :

```json
{
    "status": 200,
    "error": null,
    "data": {
        "task": "develop todo api",
        "status": "todo",
        "priority": 0
    }
}
```

</details>


<details>
<summary>PATCH - /todo/task?id=1669103816619</summary>

### Update task by ID

Body:

```json
{
    "task": "develop todo api", 
    "status": "in progress", 
    "priority": 1
}
```

Response :

```json
{
    "status": 200,
    "error": null,
    "data": {
        "task": "develop todo api",
        "status": "in progress",
        "priority": 1
    }
}
```

</details>

<details>
<summary>DELETE - /todo/task?id=1669103816619</summary>

### Remove task by ID

Response :

```json
{
    "status": 200,
    "error": null,
    "data": {
        "task": "test",
        "status": "in progress",
        "priority": 1,
        "1669102768533": {
            "task": "test",
            "status": "in progress",
            "priority": 1
        },
        "1669102769114": {
            "task": "test",
            "status": "in progress",
            "priority": 1
        }
    }
}
```

</details>

<details>
<summary>DELETE - /todo/task?mode=all</summary>

### Remove all tasks

Response :

```json
{
    "status": 200,
    "error": null,
    "data": {}
}
```

</details>

> You can try via Postman script [here](./examples/postman/Todo.postman_collection.json).

### Healthcheck

- Gateway

  ```sh
  curl --location --request GET 'http://localhost:8580/healthz'
  ```

  <details>
  <summary>Output :</summary>

  ```json
  {
      "status": 200,
      "error": null,
      "data": "Gateway is OK"
  }
  ```

  </details>

- Todo

  ```sh
  curl --location --request GET 'http://localhost:8580/todo/healthz'
  ```

  <details>
  <summary>Output :</summary>

  ```json
  {
      "status": 200,
      "error": null,
      "data": "Todo service is OK"
  }
  ```

  </details>
