# Challenge 3 - Week 11 - Node & AWS

## Description

This project is a Node.js-based REST API designed to manage users and events.
It includes functionalities such as user registration and authentication, as well as event creation and management.
The API provides endpoints to create, retrieve, and delete both users and events, offering flexibility in
querying events based on optional parameters. The project utilizes Docker for containerization and AWS services,
ensuring scalability and reliability in deployment.

## Deploy link

- [Render deploy link](https://last-challenge-compass-api.onrender.com)

## Setup & Build Instructions

### 1. Installation

- Run `yarn install` to install dependencies.
- Run `npx prisma-generate` to generate Prisma Client.

### 2. Docker Compose

- For the first time:

  ```bash
  docker-compose up --build

### After initial build

- Run:
  
   ```bash
  docker-compose up

### API Endpoints

#### Users

- `POST /users/sign-up: Register an user.`
- `POST /users/sign-in: Log user in.`

#### Events

- `GET /events: Get events by optional query.`
- `POST /events: Create new event.`
- `DELETE /events: Delete event by day of week.`
- `GET /events/{id}: Get event by id.`
- `DELETE /events/{id}: Delete event by id.`

### Technologies Used

- TypeScript
- NodeJS
- ExpressJS
- MongoDB
- PrismaORM
- Zod
- JWT
- Docker
- Eslint
- Prettier
- Jest
- Yarn
- Swagger
