import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Link,
  Box,
  useColorMode,
  useToken,
  Textarea,
  Icon,
} from '@chakra-ui/react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useEffect } from 'react'

import { IoMdDocument } from 'react-icons/io'
import { useState } from 'react'
import { IUser } from '../components/interfaces'
const Submit = ({}) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
  const [gray250, black] = useToken('colors', ['gray.250', 'black'])
  const submitBoxBgColor = { light: 'gray.50', dark: 'gray.900' }
  const borderColor = { light: 'gray.400', dark: '#2D3748' }
  const { colorMode } = useColorMode()
  const bodyBackgroundColor = { light: gray250, dark: black }
  useEffect(() => {
    document.body.style.backgroundColor = bodyBackgroundColor[colorMode]
  }, [colorMode])
  useEffect(() => {
    // fetchPosts()
    axios
      .get('http://localhost:3001/api/v1/auth/user', {
        withCredentials: true,
      })
      .then(response => setUser(response.data.user))
      .catch(err => console.error(err))
    // setPosts([...posts].sort((a, b) => (a.upvotes < b.upvotes ? 1 : -1)))
  }, [])
  if (!user) return <p>Not Authenticated</p>
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      w='100%'
      h='100vh'
    >
      {/* <Box w='740px' bgColor={submitBoxBgColor[colorMode]} p='30px 20px' */}

      <Box
        borderRadius='5px'
        border='1px solid'
        borderColor={borderColor[colorMode]}
        width='500px'
        bgColor={submitBoxBgColor[colorMode]}
        p='30px 20px 10px 20px'
        m='100px auto auto auto'
      >
        <Formik
          initialValues={{
            title: '',
            content: '',
          }}
          // validationSchema={DisplayingLoginErrorMessagesSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post(
                'http://localhost:3001/api/v1/posts',
                {
                  title: values.title,
                  content: values.content,
                },
                { withCredentials: true }
              )
              router.push('/')
            } catch (err) {
              console.error(err)
            }
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormLabel fontWeight='bold' h='25px' mb='20px'>
                <Box
                  display='inline-flex'
                  flexDir='row'
                  alignItems='center'
                  h='25px'
                >
                  <Icon
                    as={IoMdDocument}
                    fontSize='25px'
                    h='25px'
                    display='inline-block'
                    mr='5px'
                  />
                  <Text fontSize='20px' display='inline-block'>
                    Post to Reddit
                  </Text>
                </Box>
              </FormLabel>

              <FormControl
                isRequired
                isInvalid={errors.title && touched.title}
                w='100%'
                p='0 0px'
              >
                <Input
                  name='title'
                  type='title'
                  placeholder='Title'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  m='5px 0'
                />
                <Textarea
                  type='content'
                  name='content'
                  placeholder='Text (Optional)'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  h='182px'
                  m='5px 0'
                />
                <FormErrorMessage>{errors.content}</FormErrorMessage>
              </FormControl>

              <Button
                type='submit'
                disabled={isSubmitting}
                fontSize='13px'
                h='32px'
                m='10px auto 0 auto'
                borderRadius='16px'
                // bgColor='upvote'
                colorScheme='scarlet'
                fontWeight='bold'
                p='0 15px'
                float='right'
              >
                POST
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Submit
