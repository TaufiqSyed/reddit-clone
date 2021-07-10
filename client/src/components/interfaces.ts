export interface IPost {
  id: number
  title: string
  content: string
  user_id: number
  upvotes: number | string
  username?: string
}

export interface IComment {
  id: number
  content: string
  post_id: number
  user_id: number
  username: string
}

export interface IUser {
  id: number
  username: string
  admin: boolean
}
