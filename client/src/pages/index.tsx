import { Flex, Spacer, Stack } from '@chakra-ui/layout'
import { Box, useColorMode, useToken } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Post } from '../components/Post'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { IPost } from '../components/interfaces'
import { useRouter } from 'next/router'

const Index: React.FC<{ authSuccessful: boolean; posts: IPost[] }> = ({
  authSuccessful: isAuth,
  posts,
}) => {
  const { colorMode } = useColorMode()
  const [gray250, black] = useToken('colors', ['gray.250', 'black'])
  const bgColor = { light: gray250, dark: black }
  const router = useRouter()
  const handleVote = async (post_id: number, vote_score: 0 | 1 | -1) => {
    if (!isAuth) {
      alert('You must sign in to vote')
      return
    }
    try {
      await axios.post(
        `http://localhost:3001/api/v1/posts/${post_id}/vote`,
        {
          vote_score,
        },
        { withCredentials: true }
      )
      router.push(router.asPath)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
  }, [colorMode])
  return (
    <Box height='100vh'>
      <Navbar username='mynamejeff' />
      <Box mt='80px'>{'auth: ' + isAuth.toString()}</Box>
      <Stack mt='80px' spacing='10px' w='100%'>
        {posts.map((post, i) => (
          <Post {...post} isAuth={isAuth} handleVote={handleVote} key={i} />
        ))}
      </Stack>
    </Box>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const authSuccessful: boolean = (
      await axios.get('http://localhost:3001/api/v1/auth', {
        headers: context?.req?.headers?.cookie
          ? { cookie: context.req.headers.cookie }
          : undefined,
        withCredentials: true,
      })
    ).data.authSuccessful
    const posts = (await axios.get('http://localhost:3001/api/v1/posts')).data

    const propsData: { authSuccessful: boolean; posts: IPost[] } = {
      authSuccessful,
      posts,
    }
    return {
      props: propsData,
    }
  } catch (err) {
    return {
      props: {
        serverError: true,
      },
    }
  }
}

export default Index
