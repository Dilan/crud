# Postgres


    $ docker pull postgres:13

    $ docker run -p 127.0.0.1:5432:5432 \
        -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
        --name postgres -v ~/postgres/:/var/lib/postgresql/data  -d postgres:13


    $ postgresql://postgres:postgres@127.0.0.1:5432/immersive


# REST

Get token by user / password:

    $ curl -X POST http://127.0.0.1:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"admin@dilan.app","password":"qwerty"}'


Create company:

    $ curl -X POST http://127.0.0.1:3000/api/companies -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU" -H 'Content-Type: application/json' -d '{ "name": "Immersive VR", "phone":"(353) 000-01-02", "email": "info@immersivevreducation.com", "website": "immersivevreducation.com" }'

Update company by ID:

    $ curl -X PUT http://127.0.0.1:3000/api/companies/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU" -H 'Content-Type: application/json' -d '{"phone":"(555) 00-98-98"}'


Get company list:

    $ curl http://127.0.0.1:3000/api/companies -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU"

Get company by ID:

    $ curl http://127.0.0.1:3000/api/companies/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGRpbGFuLmFwcCJ9LCJpYXQiOjE2MzM1MzQ1MjA3NzIsImV4cCI6MTYzMzYyMDkyMDc3Mn0.-diAoqzcOl5dYSHuheY2xbO5gXmJnJMsWqEKb0XlFZU"
