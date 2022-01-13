# Reddit-Clone

A reddit clone I created as a demo full-stack project.

## Features

- Can create users, posts, and comments
- Local authentication
  - Persistent login via JWT cookie
  - Register user
  - Login / logout user
  - Hashed password stored in database
- Upvote system available for posts
  - Posts sorted by vote value
- Users can leave comments on posts
- Dark mode

## Technologies used

Front-end

- Typescript
- React JS
- Next JS
- Chakra UI
- Axios
- Joi

Back-end

- Typescript
- Node JS
- Express
- Passport JS
- PostgreSQL
- Objection JS (built on Knex JS) - Object-Relational Mapping
- Bcrypt - for encrypting / decrypting

## Instructions on running the app

- Using cmd or terminal navigate to your chosen folder and run the command

  `git clone https://github.com/TaufiqSyed/reddit-clone.git`

- Open the client folder in your editor
- Use your editor's native command line and run the commands

  `npm install`

  `npm run dev`

- This should set up the client-side at `http://localhost:3000/`
- Install PostgreSQL
- Next open the server folder in your editor
- Create a .env file in the server folder (no file name just .env) and enter the information below.
  ```
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=postgres
  POSTGRES_USER_PW=postgres
  SECRET=randomtext
  ```
- You can alter any of the parameters. For the secret you can use a random text generator.
- Use your editor's native command line and run the commands

  `npm install`

  `npm run dev`

- This should set up the server

- Everything is set up - open the application from `http://localhost:3000/`
