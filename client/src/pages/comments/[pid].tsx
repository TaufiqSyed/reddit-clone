import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Comment from '../../components/Comment'
import Post from '../../components/Post'
import { IComment, IPost } from '../../components/interfaces'
import { Box, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import {
  primaryBorderColor,
  primaryComponentColor,
  secondaryComponentColor,
} from '../../components/colors'
import { CreateCommentInput } from '../../components/CreateCommentInput'

const Details = ({ pid, post, comments }) => {
  const router = useRouter()
  const queryKey = 'pid'
  const { colorMode } = useColorMode()

  return (
    // <Box w='100%' h='auto' bgColor='black'>
    //   {/* <Box w='50px' h='auto' bgColor={primaryComponentColor}></Box> */}
    // </Box>
    <Flex w='100%' h='100%' p='50px 0'>
      <Spacer />

      <Box
        bgColor={secondaryComponentColor[colorMode]}
        w='700px'
        h='auto'
        p='0 0 20px 0'
      >
        <Post {...post} />
        <CreateCommentInput user_id={123} post_id={pid} />
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
      post: post,
      comments: comments,
    },
  }
}

export default Details
