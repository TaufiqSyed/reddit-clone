import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Comment from '../../components/Comment'
import { Post } from '../../components/Post'
import { IComment, IPost } from '../../components/interfaces'

const Details = ({ pid, post, comments }) => {
  const router = useRouter()
  const queryKey = 'pid'

  return (
    <div>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <br />
      <Post {...post} />
      {/* TODO: <InputComment /> */}
      {comments.map(comment => (
        <Comment
          key={comment.id}
          content={comment.content}
          username={comment.username}
          id={comment.id}
        />
      ))}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { pid } = ctx.query
  const comments: IComment[] = (
    await axios.get(`http://localhost:3001/api/v1/comments/pid/${pid}`)
  ).data
  const post: IPost = (
    await axios.get(`http://localhost:3001/api/v1/posts/${pid}`)
  ).data
  return {
    props: {
      pid: pid,
      post: post,
      comments: comments,
    },
  }
}

export default Details
