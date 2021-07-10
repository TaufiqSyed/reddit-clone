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
  Text,
  Link,
} from '@chakra-ui/react'

import { Formik, Form } from 'formik'

import React, { useEffect, useState } from 'react'

import { DisplayingLoginErrorMessagesSchema } from '../validation'
import axios from 'axios'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { useContext } from 'react'
import Navbar from '../components/Navbar'

const Login: React.FC<{
  user: { username: string; id: number; admin: boolean } | null
}> = ({ user }) => {
  const [gray250, black] = useToken('colors', ['gray.250', 'black'])
  const { colorMode } = useColorMode()
  const borderColor = { light: 'gray.400', dark: '#2D3748' }
  const loginBoxBgColor = { light: 'gray.50', dark: 'gray.900' }
  const bodyBackgroundColor = { light: gray250, dark: black }
  const router = useRouter()

  useEffect(() => {
    document.body.style.backgroundColor = bodyBackgroundColor[colorMode]
  }, [colorMode])

  useEffect(() => {
    if (!!user) {
      router.push('/')
    }
  }, [])

  return (
    <Box h='100vh' w='100%'>
      {/* <Navbar />{' '} */}
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
          {!!user && (
            <Alert
              status={!!user ? 'success' : 'error'}
              p='10px 20px'
              m='0'
              mb='20px'
              // bgColor='red.100'
              borderRadius='5px'
            >
              <AlertIcon />
              {!!user
                ? 'Successfully logged in!'
                : 'Incorrect username or password'}
              <CloseButton
                size='sm'
                position='absolute'
                right='10px'
                // onClick={() => setAuthSuccessful(undefined)}
              />
            </Alert>
          )}

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={DisplayingLoginErrorMessagesSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.post(
                  'http://localhost:3001/api/v1/auth',
                  {
                    username: values.username,
                    password: values.password,
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
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Heading fontSize='25px' m='10px 0 40px 0'>
                  Sign in to your account
                </Heading>
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
                <Text fontSize='13px' m='20px 0 0 0'>
                  New to Reddit?{' '}
                  <NextLink href={'/register'} passHref>
                    <Link fontWeight='bold' color='blue.500'>
                      SIGN UP
                    </Link>
                  </NextLink>
                </Text>
              </Form>
            )}
          </Formik>
        </Box>

        <Spacer />
      </Flex>
    </Box>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const user: { username: string; id: number; admin: boolean } | null = (
      await axios.get('http://localhost:3001/api/v1/auth/user', {
        withCredentials: true,
        headers: context.req
          ? { cookie: context.req.headers.cookie }
          : undefined,
      })
    ).data.user
    return { props: { user } }
  } catch (err) {
    return {
      props: {
        serverError: true,
      },
    }
  }
}

export default Login
