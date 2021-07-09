import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Comment from '../../components/Comment'
import { IComment, IPost } from '../../components/interfaces'

const Details = () => {
  const router = useRouter()
  const queryKey = 'pid'
  const pid =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
  const [comments, setComments] = useState<Array<IComment>>([])
  const [post, setPost] = useState<IPost>()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/comments/pid/${pid}`)
      .then(response => {
        setComments(response.data)
      })
      .catch(err => {
        console.error(err)
      })
    axios
      .get(`http://localhost:3001/api/v1/posts/${pid}`)
      .then(response => {
        const postData = response.data
        setPost({ ...postData, upvotes: parseInt(postData.upvotes) })
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  return (
    <div>
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

export default Details
