# Services-api

## Rules
  - **Home**
    - the user will have access ***logged*** or **not *logged***.
    - aplicar uma segurança para evitar com que terceiros use sua api

  - **Products**
    - the user will have access ***logged*** or **not *logged***.

  - **Product**
    - the user will have access ***logged*** or **not *logged***.
    - payment will only be made with a ***logged*** in user.

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
  - yarn knex migrate:make "products"

  Send new changes to table
  - yarn knex migrate:latest

  Refactor table to new changes
  - yarn knex migrate:rollback

  Down the table
  - yarn knex migrate:down "file.ts"

## Error Code
  - **1000:** *Token Not Provided*
  - **1001:** *Token Error*
  - **1002:** *Token Malformation*
  - **1003:** *Token Invalid*
