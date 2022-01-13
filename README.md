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
- Responsive
- All data persistent through database and RESTful API
- Dark mode

## Technologies used

Front-end

- Typescript
- React JS
- Next JS
- Chakra UI
- Axios
- Formik
- Joi

Back-end

- Typescript
- Node JS
- Express
- Passport JS
- PostgreSQL
- Objection JS (built on Knex JS) - ORM
- Bcrypt

## Project Images

![reddit-clone 1](https://user-images.githubusercontent.com/61982529/149331049-a2483d99-917f-42f9-8b28-725603f4c677.png)
![reddit-clone 2](https://user-images.githubusercontent.com/61982529/149331804-7ef83ffe-8271-49cc-be0f-fb5647724d1a.png)
![reddit-clone 3](https://user-images.githubusercontent.com/61982529/149331825-8f385f49-068a-4d0e-abed-1be23658327b.png)
![reddit-clone 4](https://user-images.githubusercontent.com/61982529/149331844-432a058a-f8e2-45b0-82ce-a4b9c3a78fac.png)
![reddit-clone 5](https://user-images.githubusercontent.com/61982529/149331857-dde0ea65-93a1-4916-bc1e-a78afc41a664.png)
![reddit-clone 5 5](https://user-images.githubusercontent.com/61982529/149331863-a4d0d19f-5b06-42d0-9126-5db8988b4bfa.png)
![reddit-clone 6](https://user-images.githubusercontent.com/61982529/149384717-20577960-687d-49b7-85d8-a16388ea488d.png)

API Routes via Postman

![reddit-clone api](https://user-images.githubusercontent.com/61982529/149340184-a730653f-7ed1-4ad7-9d3a-0f07a621851f.png)


## Instructions on running the app

- Using cmd or terminal navigate to your chosen folder and run the command

  `git clone https://github.com/TaufiqSyed/reddit-clone.git`

- Open the client folder in your editor
- Use your editor's native command line and run the commands

  `npm install`

  `npm run dev`

- This should set up the client-side at `http://localhost:3000/`
- Install PostgreSQL https://www.postgresql.org/download/
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
- Use your editor's native command line and run the command:

  `npm install`
  
- Now open psql (the postgresql terminal) and run the command:

  `create database reddit_clone;`
  
- Then run the following command in the integrated terminal in your server folder in your editor  

  `npx knex migrate:latest`
  
- Optionally, you can run `npx knex seed:run` to populate the database with some dummy data
 
- Lastly run the following command in the integrated terminal in your server folder in your editor:

  `npm run dev`

- Everything is set up now - open the application from `http://localhost:3000/`
