import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Comment from '../../components/Comment'
import Post from '../../components/Post'
import { IComment, IPost } from '../../constants/interfaces'

import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  useColorMode,
} from '@chakra-ui/react'
import {
  bgColor,
  primaryBorderColor,
  secondaryComponentColor,
} from '../../constants/colors'
import { CreateCommentInput } from '../../components/CreateCommentInput'
import Navbar from '../../components/Navbar'

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
  const logOut = async () => {
    try {
      await axios.delete('http://localhost:3001/api/v1/auth', {
        withCredentials: true,
      })
      router.reload()
    } catch (err) {
      console.error(err)
    }
  }
  axios
    .get(`http://localhost:3001/api/v1/auth/user`, {
      withCredentials: true,
    })
    .then(value => {
      setAuthUser(value.data.user)
    })

  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
  }, [colorMode])

  return (
    <>
      <Button
        position='absolute'
        h='max(100vh,100%)'
        w='100%'
        bgColor='rgba(0,0,0,0)'
        zIndex='1'
        _hover={{}}
        _active={{}}
        _focus={{}}
        cursor='default'
        onClick={() => router.replace('/')}
      ></Button>
      <Navbar user={authUser} logOut={logOut} />
      <Flex w='100%' justifyContent='center'>
        <Box
          w='700px'
          h='max(100vh,100%)'
          position='absolute'
          zIndex='2'
          m='0 auto'
        ></Box>
      </Flex>

      <Flex w='100%' h='100%' p='56px 0 30px 0' zIndex='0'>
        <Spacer />
        <Box
          bgColor={secondaryComponentColor[colorMode]}
          mt='10px'
          w='700px'
          h='auto'
          p='0'
          borderRadius='5px'
          zIndex='2'
        >
          <Post {...post} handleVote={handleVote} user={authUser} />
          {authUser != null && (
            <CreateCommentInput
              authUser={authUser}
              post_id={pid}
              fetchComments={fetchComments}
            />
          )}
          <Box
            border='1px solid'
            borderColor={primaryBorderColor[colorMode]}
            borderRadius='5px'
            _hover={{ borderColor: 'gray.500' }}
            mt='-0.5px'
          >
            {comments.map(comment => (
              <Box key={comment.id}>
                <Comment
                  key={comment.id}
                  content={comment.content}
                  username={comment.username}
                  id={comment.id}
                />
                <Divider />
              </Box>
            ))}
          </Box>
        </Box>
        <Spacer />
      </Flex>
    </>
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
