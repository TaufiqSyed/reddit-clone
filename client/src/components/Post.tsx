import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import { useColorMode, Button, useToken, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

interface PostProps {
  id: string
  title: string
  body: string
  upvotes: number
  userId: number
}

export const Post: React.FC<PostProps & { username: string }> = ({
  id,
  title,
  body,
  upvotes: initialUpvotes,
  userId,
  username,
}) => {
  const { colorMode } = useColorMode()
  const borderColor = { light: 'gray.400', dark: 'gray.700' }
  const postPrimaryColor = { light: 'gray.50', dark: 'gray.900' }
  const postSecondaryColor = { light: 'gray.75', dark: 'gray.1000' }
  const [gray500] = useToken('colors', ['gray.500'])
  const unvoteColor = {
    light: 'gray.600',
    dark: 'gray.400',
  }
  const voteHoverBackgroundColor = {
    light: 'gray.200',
    dark: 'black',
  }

  const [vote, setVote] = useState(0)
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  // on initial load check state from db

  const handleVoteChange = (voteFrom: string) => {
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
    // setUpvotes(vote)
  }

  // useEffect(() => {
  //   document.body.style.backgroundColor = bodyBackgroundColor[colorMode]
  // }, [colorMode])

  // useEffect(() => {
  //   document.body.style.backgroundColor = 'red'
  // }, [colorMode])

  return (
    <Flex
      mt='10px'
      w='700px'
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
        borderRadius='5px'
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
          {vote}
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
      <Box pl='1em' pt='5px' bgColor={postPrimaryColor[colorMode]}>
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
          {body}
        </Text>
      </Box>
    </Flex>
  )
}
