import {
  Box,
  Input,
  Icon,
  Text,
  useColorMode,
  useToken,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IoPersonCircle } from 'react-icons/io5'

const CreatePost = () => {
  const [gray500] = useToken('colors', ['gray.500'])
  const router = useRouter()
  const postPrimaryColor = { light: 'gray.50', dark: 'gray.800' }
  const borderColor = { light: 'gray.400', dark: 'gray.700' }
  const { colorMode } = useColorMode()
  // return <h1>HELLO HLLO HELLO</h1>
  return (
    <Box
      display='flex'
      w='100%'
      m='10px auto'
      maxW='700px'
      minW='482x'
      h='58px'
      border='1px solid'
      borderColor={borderColor[colorMode]}
      borderRadius='5px'
      flexDir='row'
      alignItems='center'
      bgColor={postPrimaryColor[colorMode]}
      _hover={{ borderColor: gray500 }}
      p='0 10px 0 5px'
    >
      <Icon
        as={IoPersonCircle}
        fontSize='42px'
        p='0'
        mr='3px'
        color='gray.300'
      />
      <Input
        placeholder='Create Post'
        height='38px'
        variant='filled'
        onClick={() => {
          router.push('/submit')
        }}
      />
    </Box>
  )
}

export default CreatePost
