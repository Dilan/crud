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

Get token by user / password:

### Request

`POST /api/auth/login`

    $ curl -i -X POST http://127.0.0.1:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"admin@dilan.app","password":"qwerty"}'

### Response

    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM3MDY2Njg1NjUsImV4cCI6MTYzMzc5MzA2ODU2Nn0.15iPLMNz0Rk693H7sPgLwAPswam3C9RfnAd4Y0akGJs"}%

Get company list:

    $ curl http://127.0.0.1:3000/api/companies?pretty -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM2ODIyOTI5NDAsImV4cCI6MTYzMzc2ODY5Mjk0MH0.7hWM-1hZhbVXMLkh6IsxPRtMlyRi0YuhfvkCqU6N0ck"

Get company by ID:

    $ curl http://127.0.0.1:3000/api/companies/1?pretty -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU"

Create company:

    $ curl -X POST http://127.0.0.1:3000/api/companies -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU" -H 'Content-Type: application/json' -d '{ "name": "Immersive VR", "phone":"(353) 000-01-02", "email": "info@immersivevreducation.com", "website": "immersivevreducation.com" }'

Update company by ID:

    $ curl -X PUT http://127.0.0.1:3000/api/companies/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU" -H 'Content-Type: application/json' -d '{"phone":"(555) 00-98-98"}'
