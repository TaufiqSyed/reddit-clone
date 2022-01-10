import { Request, Response, NextFunction } from 'express'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to view this resource' })
  }
}

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  console.log(req.user)
  if (req.isAuthenticated() && req.user.admin) {
    next()
  } else {
    res.status(401).json({
      message:
        'You are not authorized to view this resource because you are not an admin.',
    })
  }
}
