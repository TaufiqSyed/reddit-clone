import { Flex, Spacer, Stack } from '@chakra-ui/layout'
import { Box, useColorMode, useToken } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Post } from '../components/Post'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { IPost } from '../components/interfaces'

const Index: React.FC<{ authSuccessful: boolean; posts: IPost[] }> = ({
  authSuccessful,
  posts,
}) => {
  const { colorMode } = useColorMode()
  const [gray250, black] = useToken('colors', ['gray.250', 'black'])
  const bgColor = { light: gray250, dark: black }
  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
    console.log(authSuccessful, posts)
  }, [colorMode])
  return (
    <Box height='100vh'>
      <Navbar username='mynamejeff' />
      {/* <Box mt='80px'>{'auth: ' + authSuccessful.toString()}</Box> */}
      <Stack mt='80px' spacing='10px' w='100%'>
        {posts.map((post, i) => (
          <Post {...post} key={i} />
        ))}
      </Stack>
    </Box>
  )
}
export async function getServerSideProps(context: any) {
  try {
    const resAuth = await axios.get('http://localhost:3001/api/v1/auth')
    const resPosts = await axios.get('http://localhost:3001/api/v1/posts')

    const propsData: { authSuccessful: boolean; posts: IPost[] } = {
      authSuccessful: resAuth.data.authSuccessful,
      posts: resPosts.data,
    }
    return {
      props: propsData,
    }
  } catch (err) {
    return {
      serverError: true,
    }
  }
}

export default Index
