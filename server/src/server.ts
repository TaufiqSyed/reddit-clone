import dotenv from 'dotenv'
dotenv.config()
import apiRouter from './api'
import express, { Request, Response, NextFunction } from 'express'
import { Model } from 'objection'
import session from 'express-session'
import cors from 'cors'
import connection from './config/db'
import passport from 'passport'

const app = express()

Model.knex(connection)

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: <string>process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', apiRouter)

app.listen(3001, () => {
  console.log('Server listening on port 3001')
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
