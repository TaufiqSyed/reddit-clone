import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import {
  useColorMode,
  Button,
  useToken,
  Box,
  Spacer,
  Icon,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { GoComment } from 'react-icons/go'
import { useRouter } from 'next/router'

import { IPost } from './interfaces'
export const Post: React.FC<
  IPost & {
    isAuth: boolean
    handleVote: (post_id: number, vote_score: 1 | 0 | -1) => void
  }
> = ({
  id,
  title,
  content,
  upvotes: initialUpvotes,
  user_id,
  username,
  isAuth,
  handleVote,
}) => {
  // const [username, setUsername] = useState('')
  const { colorMode } = useColorMode()
  const borderColor = { light: 'gray.400', dark: 'gray.700' }
  const postPrimaryColor = { light: 'gray.50', dark: 'gray.800' }
  const postSecondaryColor = { light: 'gray.75', dark: 'gray.900' }
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

  const [vote, setVote] = useState<0 | 1 | -1>(0)
  const [upvotes, setUpvotes] = useState(initialUpvotes)

  // on initial load check state from db
  // const refreshData = () => {
  //   router.replace(router.asPath)
  // }

  const handleVoteChange = (voteFrom: string) => {
    if (!isAuth) {
      alert('You log in to vote')
      return
    }
    if (voteFrom === 'upvote') {
      if (vote === 1) {
        setVote(0)
      } else {
        setVote(1)
      }
    } else if (voteFrom === 'downvote') {
      if (vote === -1) {
        setVote(0)
      } else {
        setVote(-1)
      }
    }
    handleVote(id, vote)
  }
  // const handleVoteChange = (x: any) => {}

  return (
    <Flex w='100%' direction='column' alignItems='center'>
      <Flex
        w='100%'
        maxW='700px'
        minW='482x'
        h='auto'
        border='1px solid'
        borderColor={borderColor[colorMode]}
        borderRadius='5px'
        flexDir='row'
        _hover={{ borderColor: gray500 }}
      >
        <Box
          position='relative'
          bgColor={postSecondaryColor[colorMode]}
          p='5px 7px 0 7px'
          borderRadius='5px 0 0 5px'
        >
          <Button
            position='relative'
            aria-label='upvote'
            variant='ghost'
            size='50px'
            grow='1'
            onClick={() => handleVoteChange('upvote')}
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
            onClick={() => handleVoteChange('downvote')}
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
          bgColor={postPrimaryColor[colorMode]}
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
                console.log(id)
                console.log(`/comments/${id.toString()}`)
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
