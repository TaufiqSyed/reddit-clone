interface IUser {
  id: number
  username: string
  password: string
  admin: boolean
}

declare namespace Express {
  export interface Request {
    user?: IUser
    logout: any
  }
}
