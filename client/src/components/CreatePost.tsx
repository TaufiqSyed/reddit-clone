import { Box, Input, Icon, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IoMdPerson } from 'react-icons/io'
const CreatePost = () => {
  const router = useRouter()
  const postPrimaryColor = { light: 'gray.50', dark: 'gray.800' }
  const { colorMode } = useColorMode()
  return (
    <Box
      pl='1em'
      pt='5px'
      bgColor={postPrimaryColor[colorMode]}
      borderRadius='0 5px 5px 0'
      w='100%'
      onClick={() => {
        router.push('/submit')
      }}
    >
      {/* <Icon as={IoMdPerson} /> */}
      <Text>Helo</Text>
      {/* <Input>Create Post</Input> */}
    </Box>
  )
}

export default CreatePost
