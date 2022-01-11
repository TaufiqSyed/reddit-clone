import {
  useToken,
  useDisclosure,
  useColorMode,
  Box,
  Icon,
  Button,
  Text,
  Textarea,
  Input,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react'
import axios from 'axios'
import { FormikProps, Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import {
  primaryBorderColor,
  primaryComponentColor,
  inputColor,
  secondaryComponentColor,
  textColor,
} from './colors'
import { ICreateComment } from './interfaces'

export const CreateCommentInput: React.FC<{
  user_id: number
  post_id: string
}> = ({ user_id, post_id }) => {
  const [gray500] = useToken('colors', ['gray.500'])
  const router = useRouter()

  const { colorMode } = useColorMode()
  return (
    <>
      <Box
        display='flex'
        w='100%'
        m='0 auto 16px auto'
        maxW='700px'
        minW='482x'
        // h='58px'
        border='1px solid'
        borderColor={primaryBorderColor[colorMode]}
        borderRadius='5px'
        flexDir='column'
        bgColor={primaryComponentColor[colorMode]}
        _hover={{ borderColor: gray500 }}
        p='0 10px 0 10px'
      >
        <Formik
          children={CreateCommentForm}
          initialValues={{
            content: '',
          }}
          onSubmit={async values => {
            try {
              await axios.post(
                'http://localhost:3001/api/v1/comments',
                {
                  content: values.content,
                  user_id: user_id,
                  post_id: post_id,
                },
                { withCredentials: true }
              )
            } catch (err) {
              console.error(err)
            }
          }}
        ></Formik>
      </Box>
    </>
  )
}

const CreateCommentForm = ({ values, handleChange, handleSubmit }) => {
  const { colorMode } = useColorMode()
  return (
    <Form onSubmit={handleSubmit}>
      <Text
        display='block'
        w='100%'
        h='auto'
        position='relative'
        m='5px 5px'
        fontSize='13px'
      >
        Comment as u/undefined
      </Text>
      <Textarea
        p='5px 10px'
        w='100%'
        h='100px'
        // flexDir='column'
        // alignItems='flex-start'
        bgColor={primaryComponentColor[colorMode]}
        _hover={{ cursor: 'text' }}
        placeholder='What are your thoughts?'
        fontSize='14px'
        name='content'
        type='content'
        value={values.content}
        onChange={handleChange}
      ></Textarea>
      <Flex w='100%' justifyContent='right'>
        <Button
          w='100px'
          m='8px 5px'
          colorScheme='blue'
          onClick={() => {
            handleSubmit()
          }}
        >
          Comment
        </Button>
      </Flex>
    </Form>
  )
}
