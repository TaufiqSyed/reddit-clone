import { Box } from '@chakra-ui/react'
import React from 'react'
const Comment: React.FC<{ id: number; content: string; username: string }> = ({
  id,
  content,
  username,
}) => {
  return (
    <Box>
      <h3>{username}</h3>
      <p>{content}</p>
    </Box>
  )
}

export default Comment
