import { Box, Text } from '@chakra-ui/react'
import React from 'react'
const Comment: React.FC<{ id: number; content: string; username: string }> = ({
  id,
  content,
  username,
}) => {
  return (
    <Box p='10px 15px 0 30px'>
      <Text
        display='block'
        w='100%'
        h='auto'
        position='relative'
        m='5px 0'
        fontSize='10px'
        color='gray.400'
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
