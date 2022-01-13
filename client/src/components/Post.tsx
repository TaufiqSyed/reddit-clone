import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import { useColorMode, Button, useToken, Box, Icon } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { GoComment } from 'react-icons/go'
import { useRouter } from 'next/router'

import { IPost } from './interfaces'
import {
  primaryBorderColor,
  primaryComponentColor,
  secondaryComponentColor,
} from './colors'
const Post: React.FC<
  IPost & {
    handleVote: (post_id: number, vote_score: number) => void
    user: { id: number; username: string; admin: boolean } | null
  }
> = ({ id, title, content, upvotes, user_id, username, handleVote, user }) => {
  const { colorMode } = useColorMode()
  const [isLoading, setIsLoading] = useState(true)
  const [gray500] = useToken('colors', ['gray.500'])
  const unvoteColor = {
    light: 'gray.600',
    dark: 'gray.400',
  }
  const voteHoverBackgroundColor = {
    light: 'gray.200',
    dark: 'black',
  }

  const router = useRouter()

  const [vote, setVote] = useState<number>(0)
  const fetchVote = async () => {
    try {
      const updatedVote = (
        await axios.get(`http://localhost:3001/api/v1/posts/${id}/vote`, {
          withCredentials: true,
        })
      ).data.vote_score
      setVote(updatedVote)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (user) {
      fetchVote()
    } else {
      setIsLoading(false)
    }
  }, [])

  const updateAfterVote = (voteFrom: string) => {
    if (!user) {
      alert('You need to log in to vote')

      return
    }
    let updatedVote

    if (voteFrom === 'upvote') {
      if (vote === 1) {
        updatedVote = 0
      } else {
        updatedVote = 1
      }
    } else if (voteFrom === 'downvote') {
      if (vote === -1) {
        updatedVote = 0
      } else {
        updatedVote = -1
      }
    }
    setVote(updatedVote)
    handleVote(id, updatedVote)
  }
  return (
    <Flex w='100%' direction='column' alignItems='center' m='0'>
      <Flex
        w='100%'
        maxW='700px'
        minW='482x'
        h='auto'
        border='1px solid'
        borderColor={primaryBorderColor[colorMode]}
        borderRadius='5px'
        flexDir='row'
        _hover={{ borderColor: gray500 }}
        m='-1px -1px'
      >
        <Box
          position='relative'
          bgColor={secondaryComponentColor[colorMode]}
          p='5px 7px 0 7px'
          borderRadius='5px 0 0 5px'
        >
          <Button
            position='relative'
            aria-label='upvote'
            variant='ghost'
            size='50px'
            grow='1'
            onClick={() => updateAfterVote('upvote')}
            padding='2px'
            color={vote === 1 ? 'upvote' : unvoteColor[colorMode]}
            fontSize='20px'
            _hover={{
              color: 'upvote',
              backgroundColor: voteHoverBackgroundColor[colorMode],
              transition: '0.2s',
            }}
          >
            <ChevronUpIcon />
          </Button>
          <Text
            textAlign='center'
            w='100%'
            h='auto'
            fontSize='12px'
            fontWeight='700'
            color={
              vote === 1
                ? 'upvote'
                : vote === -1
                ? 'downvote'
                : unvoteColor[colorMode]
            }
          >
            {upvotes}
          </Text>
          <Button
            aria-label='downvote'
            variant='ghost'
            size='auto'
            grow='1'
            padding='2px'
            onClick={() => updateAfterVote('downvote')}
            color={vote === -1 ? 'downvote' : unvoteColor[colorMode]}
            fontSize='20px'
            _hover={{
              color: 'downvote',
              backgroundColor: voteHoverBackgroundColor[colorMode],
              transition: '0.2s',
            }}
          >
            <ChevronDownIcon />
          </Button>
        </Box>
        <Box
          pl='1em'
          pt='5px'
          bgColor={primaryComponentColor[colorMode]}
          borderRadius='0 5px 5px 0'
          w='100%'
        >
          <Text
            display='block'
            w='100%'
            h='auto'
            position='relative'
            m='5px 0'
            fontSize='10px'
            color='gray.400'
          >
            {`Posted by u/${username}`}
          </Text>
          <Text
            display='block'
            w='100%'
            position='relative'
            fontWeight='600'
            fontSize='17px'
            mb='8px'
          >
            {title}
          </Text>
          <Text
            display='block'
            w='100%'
            position='relative'
            fontSize='14px'
            p='0 5px 10px 0'
          >
            {content}
          </Text>
          <Box mb='4px' color='gray.800'>
            <Button
              lineHeight='32px'
              h='32px'
              variant='ghost'
              p='0 8px'
              onClick={() => {
                router.push(`/comments/${id.toString()}`)
              }}
            >
              <Icon as={GoComment} m='10px 5px auto 0'></Icon>
              <Text fontSize='12px'>Comments</Text>
            </Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default React.memo(Post)
