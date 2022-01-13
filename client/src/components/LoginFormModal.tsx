import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik, FormikProps } from 'formik'
import router from 'next/router'
import React, { useRef } from 'react'
import { DisplayingLoginErrorMessagesSchema } from '../validation'
import { inputColor, primaryComponentColor } from './colors'
import { ILogin } from './interfaces'

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const { colorMode } = useColorMode()
  return (
    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl
        isRequired
        isInvalid={errors.username && touched.username}
        mb='12px'
      >
        <FormLabel>Username</FormLabel>
        <Input
          name='username'
          type='username'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          bgColor={inputColor[colorMode]}
        />
        <FormErrorMessage>{errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.password && touched.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          name='password'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          bgColor={inputColor[colorMode]}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
    </Form>
  )
}

const LoginFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
  const loginFormRef = useRef<FormikProps<ILogin>>()
  const submitLoginForm = () => {
    if (loginFormRef.current) {
      loginFormRef.current.handleSubmit()
    }
  }
  return (
    <>
      <Button
        colorScheme='blue'
        variant='outline'
        borderRadius='16px'
        w='120px'
        h='32px'
        lineHeight='30px'
        fontSize='15px'
        fontWeight='bold'
        m='0 8px 0 auto'
        onClick={onOpen}
      >
        Log In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight='bold'
            bgColor={primaryComponentColor[colorMode]}
          >
            Sign in to your account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={primaryComponentColor[colorMode]}>
            <Formik
              innerRef={loginFormRef}
              children={LoginForm}
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={DisplayingLoginErrorMessagesSchema}
              onSubmit={async values => {
                try {
                  const value = (
                    await axios.post(
                      'http://localhost:3001/api/v1/auth',
                      {
                        username: values.username,
                        password: values.password,
                      },
                      { withCredentials: true }
                    )
                  ).data
                  if (value.authSuccessful) {
                    onClose()
                    router.reload()
                  } else {
                    alert('Invalid username or password')
                  }
                } catch (err) {
                  console.error(err)
                }
              }}
            />
          </ModalBody>

          <ModalFooter bgColor={primaryComponentColor[colorMode]}>
            <Button
              colorScheme='blue'
              mr='12px'
              onClick={() => {
                submitLoginForm()
              }}
            >
              Sign In
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginFormModal
