import { Stack } from '@chakra-ui/layout'
import { Box, Spinner, useColorMode, useToken } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import Post from '../components/Post'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { IPost, IUser } from '../components/interfaces'
import { useRouter } from 'next/router'
import CreatePostModal from '../components/CreatePostModal'

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
      setPosts(
        [...updatedPosts].sort((a, b) => (a.upvotes < b.upvotes ? 1 : -1))
      )
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }
  const updateOnePost = async (post_id: number) => {
    try {
      const updatedPost = (
        await axios.get(`http://localhost:3001/api/v1/posts/${post_id}`, {
          withCredentials: true,
        })
      ).data
      setPosts(posts.map(post => (post.id === post_id ? updatedPost : post)))
    } catch (err) {
      console.error(err)
    }
  }

  // useEffect(() => {

  // }, [isLoading])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/v1/auth/user', {
        withCredentials: true,
      })
      .then(response => {
        setUser(response.data.user)
        fetchPosts()
        console.log(posts)
      })
      .catch(err => {
        console.error(err)
        fetchPosts()
      })
  }, [])

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
        updateOnePost(post_id)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
  }, [colorMode])
  // if (isLoading) {

  return (
    <Box height='100vh'>
      <Navbar user={user} logOut={logOut} />
      <Box height='66px' aria-hidden='true'></Box>
      {user ? <CreatePostModal fetchPosts={fetchPosts} /> : null}
      <Stack spacing='10px' w='100%'>
        {posts.map((post, i) => (
          <Post {...post} handleVote={handleVote} key={i} user={user} />
        ))}
      </Stack>
      <Box height='20px' aria-hidden='true'></Box>
    </Box>
  )
}

export default Index
