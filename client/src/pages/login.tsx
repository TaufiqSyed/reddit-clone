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
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Formik, Form } from 'formik'

import React, { useEffect, useState } from 'react'

import { DisplayingLoginErrorMessagesSchema } from '../validation'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'

const Login = () => {
  const [gray250, black] = useToken('colors', ['gray.250', 'black'])
  const { colorMode } = useColorMode()
  const borderColor = { light: 'gray.400', dark: '#2D3748' }
  const loginBoxBgColor = { light: 'gray.50', dark: 'gray.900' }
  const bodyBackgroundColor = { light: gray250, dark: black }
  const [authSuccessful, setAuthSuccessful] = useState<boolean | undefined>(
    undefined
  )

  const router = useRouter()

  useEffect(() => {
    document.body.style.backgroundColor = bodyBackgroundColor[colorMode]
  }, [colorMode])

  return (
    <Flex w='100%' h='100vh'>
      <Spacer />
      <Box
        borderRadius='5px'
        border='1px solid'
        borderColor={borderColor[colorMode]}
        width='500px'
        bgColor={loginBoxBgColor[colorMode]}
        p='20px 30px 30px 30px'
        m='100px auto auto auto'
      >
        {authSuccessful !== undefined && (
          <Alert
            status={authSuccessful ? 'success' : 'error'}
            p='10px 20px'
            m='0'
            mb='20px'
            // bgColor='red.100'
            borderRadius='5px'
          >
            <AlertIcon />
            {authSuccessful
              ? 'Successfully logged in!'
              : 'Incorrect username or password'}
            <CloseButton
              size='sm'
              position='absolute'
              right='10px'
              onClick={() => setAuthSuccessful(undefined)}
            />
          </Alert>
        )}

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={DisplayingLoginErrorMessagesSchema}
          onSubmit={(values, { setSubmitting }) => {
            const res = axios
              .post('http://localhost:3001/api/v1/auth', {
                username: values.username,
                password: values.password,
              })
              .then(response => {
                setAuthSuccessful(true)
                setTimeout(() => router.push('/'), 1000)
                // console.log(response.status)
                // console.log(response.headers)
                // console.log(response.statusText)
                // console.log(response.data)
              })
              .catch(err => {
                setAuthSuccessful(false)
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
              <Heading fontSize='25px' m='10px 0 40px 0'>
                Sign in to your account
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
                fontSize='13px'
                w='100%'
                h='50px'
                m='30px auto 0 auto'
                borderRadius='25px'
                colorScheme='blue'
                letterSpacing='1.5px'
                fontWeight='bold'
              >
                SIGN IN
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
