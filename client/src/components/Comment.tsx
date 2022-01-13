import { Box, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { primaryComponentColor } from './colors'
const Comment: React.FC<{ id: number; content: string; username: string }> = ({
  id,
  content,
  username,
}) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      p='8px 15px 8px 30px'
      bgColor={primaryComponentColor[colorMode]}
      borderRadius='5px'
    >
      <Text
        display='block'
        w='100%'
        h='auto'
        position='relative'
        fontSize='10px'
        color='gray.500'
      >
        {username}
      </Text>
      <Text display='block' w='100%' position='relative' fontSize='14px'>
        {content}
      </Text>
    </Box>
  )
}

export default Comment
