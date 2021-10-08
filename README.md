# Postgres with Docker

    $ docker pull postgres:13

    $ docker run -p 127.0.0.1:5432:5432 \
        -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres --name postgres \
         -v ~/postgres/:/var/lib/postgresql/data \
         -v ~/Node/web/immersive-VR/schema:/tmp/schema \
        -d postgres:13

    $ docker exec -it postgres bash

at root@*******:/#

    $ psql -U postgres;

at postgres=#

    $ CREATE DATABASE immersive_test;
    $ CREATE DATABASE immersive;
    $ exit

    $ psql -U postgres immersive < /tmp/schema/database.sql

# Test

    $ npm test

# Start API service:

    $ npm start

# REST

Test API status page:

    $ curl http://127.0.0.1:3000/


## Get token by user / password:

### Request

`POST /api/auth/login`

    $ curl -i -X POST http://127.0.0.1:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"admin@dilan.app","password":"qwerty"}'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 204
    ETag: W/"cc-eO5PSoRTcU0GqbE4S++x0MaJUOg"
    Date: Fri, 08 Oct 2021 15:24:18 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM3MDY2Njg1NjUsImV4cCI6MTYzMzc5MzA2ODU2Nn0.15iPLMNz0Rk693H7sPgLwAPswam3C9RfnAd4Y0akGJs"}%


## Get company list:

### Request

`GET /api/companies`

    $ curl -i http://127.0.0.1:3000/api/companies?pretty -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM2ODIyOTI5NDAsImV4cCI6MTYzMzc2ODY5Mjk0MH0.7hWM-1hZhbVXMLkh6IsxPRtMlyRi0YuhfvkCqU6N0ck"
    
### Response

    [
     {
        "id": 1,
        "name": "Apple Inc.",
        "email": "info@apple.com",
        "address": null,
        "phone": "(555) 90-87-65",
        "website": "apple.com",
        "createdAt": "2021-10-08T15:20:02.702Z",
        "updatedAt": "2021-10-08T15:20:02.702Z"
      },
      {
        "id": 2,
        "name": "Microsoft Corporation",
        "email": "info@microsoft.com",
        "address": null,
        "phone": "(555) 80-12-45",
        "website": "microsoft.com",
        "createdAt": "2021-10-08T15:20:02.711Z",
        "updatedAt": "2021-10-08T15:20:02.711Z"
      },
      {
        "id": 3,
        "name": "Amazon Inc.",
        "email": "info@amazon.com",
        "address": null,
        "phone": "(555) 50-39-35",
        "website": "amazon.com",
        "createdAt": "2021-10-08T15:20:02.713Z",
        "updatedAt": "2021-10-08T15:20:02.713Z"
      }
    ]
    
## Get company by ID:

### Request

`GET /api/companies/1`

    $ curl http://127.0.0.1:3000/api/companies/1?pretty -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU"

### Response

    {
        "id": 1,
        "name": "Apple Inc.",
        "email": "info@apple.com",
        "address": null,
        "phone": "(555) 90-87-65",
        "website": "apple.com",
        "createdAt": "2021-10-08T15:20:02.702Z",
        "updatedAt": "2021-10-08T15:20:02.702Z"
    }

## Create company:

### Request

`POST /api/companies`

    $ curl -X POST http://127.0.0.1:3000/api/companies -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU" -H 'Content-Type: application/json' -d '{ "name": "Immersive VR", "phone":"(353) 000-01-02", "email": "info@immersivevreducation.com", "website": "immersivevreducation.com" }'

### Response

    {
        "id":4,
        "name":"Immersive VR",
        "phone":"(353) 000-01-02",
        "email":"info@immersivevreducation.com",
        "website":"immersivevreducation.com",
        "updatedAt":"2021-10-08T15:38:35.988Z",
        "createdAt":"2021-10-08T15:38:35.988Z",
        "address":null
    }

## Update company by ID:

### Request

`PUT /api/companies/1`

    $ curl -X PUT http://127.0.0.1:3000/api/companies/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU" -H 'Content-Type: application/json' -d '{"phone":"(555) 00-98-98"}'
    

### Response

    [1,[{"id":1,"name":"Apple Inc.","email":"info@apple.com","address":null,"phone":"(555) 00-98-98","website":"apple.com","createdAt":"2021-10-08T15:20:02.702Z","updatedAt":"2021-10-08T15:40:38.385Z"}]]
