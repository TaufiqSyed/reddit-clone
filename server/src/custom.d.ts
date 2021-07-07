interface IUser {
  id: number
  username: string
  hash: string
  salt: string
  admin: boolean
}

declare namespace Express {
  export interface Request {
    user?: IUser
    logout: any
  }
}
