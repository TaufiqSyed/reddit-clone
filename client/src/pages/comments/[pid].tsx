import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Comment from '../../components/Comment'
import Post from '../../components/Post'
import { IComment, IPost, IUser } from '../../components/interfaces'
import { Box, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import {
  primaryBorderColor,
  primaryComponentColor,
  secondaryComponentColor,
} from '../../components/colors'
import { CreateCommentInput } from '../../components/CreateCommentInput'

const Details = ({
  pid,
  initialPost,
  initialComments,
}: {
  pid: string
  initialPost: IPost
  initialComments: IComment[]
}) => {
  const router = useRouter()
  const queryKey = 'pid'
  const { colorMode } = useColorMode()
  const [authUser, setAuthUser] = useState(undefined)
  const [post, setPost] = useState(initialPost)
  const [comments, setComments] = useState(initialComments)
  const fetchComments = async (pid: string) => {
    try {
      const updatedComments = (
        await axios.get(`http://localhost:3001/api/v1/comments/pid/${pid}`, {
          withCredentials: true,
        })
      ).data
      setComments(updatedComments)
    } catch (err) {
      console.error(err)
    }
  }
  const fetchPost = async (pid: string) => {
    try {
      const updatedPost = (
        await axios.get(`http://localhost:3001/api/v1/posts/${pid}`, {
          withCredentials: true,
        })
      ).data
      setPost(updatedPost)
    } catch (err) {
      console.error(err)
    }
  }
  const handleVote = (post_id: number, vote_score: number) => {
    if (authUser == null) {
      alert('You must sign in to vote')
      return
    }
    if (vote_score !== 0 && vote_score !== 1 && vote_score !== -1) return
    axios({
      method: 'post',
      url: `http://localhost:3001/api/v1/posts/${post_id}/vote`,
      data: {
        vote_score,
      },
      withCredentials: true,
    })
      .then(_response => {
        fetchPost(post_id.toString())
      })
      .catch(err => console.error(err))
  }

  axios
    .get(`http://localhost:3001/api/v1/auth/user`, {
      withCredentials: true,
    })
    .then(value => {
      setAuthUser(value.data.user)
    })

  return (
    <Flex w='100%' h='100%' p='50px 0'>
      <Spacer />

      <Box
        bgColor={secondaryComponentColor[colorMode]}
        w='700px'
        h='auto'
        p='0 0 20px 0'
      >
        <Post {...post} handleVote={handleVote} user={authUser} />
        {authUser != null && (
          <CreateCommentInput
            authUser={authUser}
            post_id={pid}
            fetchComments={fetchComments}
          />
        )}

        {comments.map(comment => (
          <Comment
            key={comment.id}
            content={comment.content}
            username={comment.username}
            id={comment.id}
          />
        ))}
      </Box>
      <Spacer />
    </Flex>
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
      initialPost: post,
      initialComments: comments,
    },
  }
}

export default Details
