import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Box,
  Spacer,
  Button,
  Stack,
  Heading,
  useColorMode,
  useToken,
} from '@chakra-ui/react'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Formik, Form } from 'formik'

import React, { useEffect } from 'react'

import { DisplayingLoginErrorMessagesSchema } from '../validation'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'

const Login = () => {
  const [gray200, black] = useToken('colors', ['gray.200', 'black'])
  const { colorMode } = useColorMode()
  const borderColor = { light: 'gray.400', dark: '#2D3748' }
  const loginBoxBgColor = { light: 'gray.50', dark: 'gray.900' }
  const bodyBackgroundColor = { light: gray200, dark: black }

  const router = useRouter()

  useEffect(() => {
    document.body.style.backgroundColor = bodyBackgroundColor[colorMode]
  }, [colorMode])

  return (
    <Flex w='100%' h='721px'>
      <Spacer />
      <Box
        borderRadius='5px'
        border='1px solid'
        borderColor={borderColor[colorMode]}
        width='700px'
        bgColor={loginBoxBgColor[colorMode]}
        p='20px 40px 40px 40px'
        m='100px auto auto auto'
      >
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={DisplayingLoginErrorMessagesSchema}
          onSubmit={(values, { setSubmitting }) => {
            const res = axios
              .post('http://localhost:3001/api/v1/user/auth', {
                username: values.username,
                password: values.password,
              })
              .then(response => {
                console.log(response.status)
                console.log(response.headers)
                console.log(response.statusText)
                console.log(response.data)
              })
              .catch(err => {
                console.log(err)
              })
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
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Heading as='h2' size='lg' m='10px 0 40px 0'>
                Login New Account
              </Heading>
              <DarkModeSwitch />
              <Stack spacing='14px'>
                <FormControl
                  isRequired
                  isInvalid={errors.username && touched.username}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    name='username'
                    type='username'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={errors.password && touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                type='submit'
                disabled={isSubmitting}
                w='100%'
                h='3em'
                mt='40px'
                colorScheme='scarlet'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <Spacer />
    </Flex>
  )
}

export default Login
