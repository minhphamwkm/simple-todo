# Simple TODO API

## Model

1. todo

| name        | type         |
| ----------- | ------------ |
| createdAt   | datetime     |
| updatedAt   | datetime     |
| deletedAt   | datetime     |
| id          | integer (PK) |
| title       | varchar(256) |
| description | varchar      |
| isCompleted | boolean      |
| tag         | varchar[]    |
| remindAt    | datetime     |
| image       | varchar      |

2. user

| name        | type         |
| ----------- | ------------ |
| createdAt   | datetime     |
| updatedAt   | datetime     |
| deletedAt   | datetime     |
| id          | integer (PK) |
| username    | varchar(256) |
| password    | varchar      |
| email       | varchar      |
| fullName    | boolean      |
| dateOfBirth | datetime     |
| gender      | datetime     |

## Quick start

Run project:
    make run

## Spec

Visit the documentation: http://localhost:3000

