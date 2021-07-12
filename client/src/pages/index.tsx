import { Flex, Spacer, Stack } from '@chakra-ui/layout'
import { Box, useColorMode, useToken } from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'

import { Post } from '../components/Post'
import Navbar from '../components/Navbar'
import axios, { AxiosTransformer } from 'axios'
import { IPost, IUser } from '../components/interfaces'
import { useRouter } from 'next/router'
import CreatePost from '../components/CreatePost'

const Index = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<IPost[]>([])
  const [user, setUser] = useState<IUser | null>(null)
  const { colorMode } = useColorMode()
  const [gray250, black] = useToken('colors', ['gray.250', 'black'])
  const bgColor = { light: gray250, dark: black }
  const router = useRouter()
  const fetchPosts = async () => {
    try {
      const updatedPosts = (
        await axios.get('http://localhost:3001/api/v1/posts', {
          withCredentials: true,
        })
      ).data
      console.log(updatedPosts)
      setPosts(updatedPosts)
      // setPosts(
      // [...updatedPosts].sort((a, b) => (a.upvotes < b.upvotes ? 1 : -1))
      // )
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchPosts()
    axios
      .get('http://localhost:3001/api/v1/auth/user', {
        withCredentials: true,
      })
      .then(response => setUser(response.data.user))
      .catch(err => console.error(err))
    // setPosts([...posts].sort((a, b) => (a.upvotes < b.upvotes ? 1 : -1)))
  }, [])

  const logOut = async () => {
    try {
      await axios.delete('http://localhost:3001/api/v1/auth', {
        withCredentials: true,
      })
      router.replace('/login')
    } catch (err) {
      console.error(err)
    }
  }

  const handleVote = (post_id: number, vote_score: number) => {
    if (!user) {
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
        fetchPosts()
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
  }, [colorMode])
  if (isLoading) return <p></p>
  return (
    <Box height='100vh'>
      <Navbar user={user} logOut={logOut} />
      <Box height='56px'></Box>
      {user ? <CreatePost /> : null}
      <Stack spacing='10px' w='100%' mt='20px'>
        {posts
          // .sort((a, b) => (a.upvotes < b.upvotes ? 1 : -1))
          .map((post, i) => (
            <Post {...post} handleVote={handleVote} key={post.id} user={user} />
          ))}
      </Stack>
      <Box height='20px'></Box>
    </Box>
  )
}

export default Index
