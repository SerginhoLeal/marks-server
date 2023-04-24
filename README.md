# Services-api

## Rules
  [] the client going to have the following accesses:
    - products
  [] aplicar uma segurança para evitar com que terceiros use sua api

## Private Routes

## Public Routes
  ```
  curl
    --url http://0.0.0.0:0000/api/home \
    --request GET \
    --header 'Content-Type: application/json'
  ```

## Database

## Knex
  Create a new migration(table)
  - yarn knex migration:make "products"

  Send new changes to table
  - yarn knex migration:latest

  Refactor table to new changes
  - yarn knex migration:rollback

  Down the table
  - yarn knex migrate:down "file.ts"