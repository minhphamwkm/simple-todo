# Simple TODO API

## Concept

Simple TODO API includes:
- Simple User management:
  - CRUD (One User)
  - Authentication
  - Login session
- Simple TODO management:
  - TODO action for each user (only owner can perform actions)

## Model

1. todo

| name        | type         |
| ----------- | ------------ |
| createdAt   | datetime     |
| updatedAt   | datetime     |
| deletedAt   | datetime     |
| id          | integer (PK) |
| ownerId     | integer      |
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
| fullName    | varchar      |
| dateOfBirth | datetime     |
| gender      | datetime     |
| avatar      | varchar      |

## Quick start

Run project:

```
make run-app
```

Test project:
```
make run-test
```

## API Documentation

Run app and visit the documentation: http://localhost:3000

