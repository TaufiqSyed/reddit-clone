import {
  useToken,
  useColorMode,
  Box,
  Button,
  Text,
  Textarea,
  Flex,
} from '@chakra-ui/react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { primaryBorderColor, primaryComponentColor } from './colors'
import { IUser } from './interfaces'

export const CreateCommentInput: React.FC<{
  authUser: IUser
  post_id: string
  fetchComments: (pid: string) => void
}> = ({ authUser, post_id, fetchComments }) => {
  const [gray500] = useToken('colors', ['gray.500'])

  const { colorMode } = useColorMode()
  return (
    <>
      <Box
        display='flex'
        w='100%'
        m='0 auto 0 auto'
        maxW='700px'
        minW='482x'
        border='1px solid'
        borderColor={primaryBorderColor[colorMode]}
        borderRadius='5px'
        flexDir='column'
        bgColor={primaryComponentColor[colorMode]}
        _hover={{ borderColor: gray500 }}
        p='0 10px 0 10px'
      >
        <Text
          display='block'
          w='100%'
          h='auto'
          position='relative'
          m='5px 5px'
          fontSize='13px'
        >
          Comment as u/{authUser.username}
        </Text>
        <Formik
          children={CreateCommentForm}
          initialValues={{
            content: '',
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await axios.post(
                'http://localhost:3001/api/v1/comments',
                {
                  content: values.content,
                  user_id: authUser.id,
                  post_id: post_id,
                },
                { withCredentials: true }
              )
              fetchComments(post_id)
              resetForm()
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
      <Textarea
        p='5px 10px'
        w='100%'
        h='100px'
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
