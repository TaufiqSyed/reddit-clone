import { Box, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { primaryComponentColor } from '../constants/colors'
const Comment: React.FC<{ id: number; content: string; username: string }> = ({
  id,
  content,
  username,
}) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      p='12px 15px 12px 30px'
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
        mb='5px'
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
