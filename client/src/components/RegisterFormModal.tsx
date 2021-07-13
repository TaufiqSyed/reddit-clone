import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'

import axios from 'axios'
import { Form, Formik, FormikProps } from 'formik'
import router from 'next/router'
import React, { useRef } from 'react'
import NextLink from 'next/link'
import { DisplayingRegisterErrorMessagesSchema } from '../validation'
import { IRegister } from './interfaces'
import { inputColor, primaryComponentColor } from './colors'

const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const { colorMode } = useColorMode()
  return (
    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl isRequired isInvalid={errors.username && touched.username}>
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
      <FormControl isRequired isInvalid={errors.password && touched.password}>
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
      <FormControl
        isRequired
        isInvalid={errors.passwordConfirmation && touched.passwordConfirmation}
      >
        <FormLabel>Repeat Password</FormLabel>
        <Input
          type='password'
          name='passwordConfirmation'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConfirmation}
        />
        <FormErrorMessage>{errors.passwordConfirmation}</FormErrorMessage>
      </FormControl>
    </Form>
  )
}

export const RegisterFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
  const registerFormRef = useRef<FormikProps<IRegister>>()
  const submitRegisterForm = () => {
    if (registerFormRef.current) {
      registerFormRef.current.handleSubmit()
    }
  }
  return (
    <>
      <Button
        colorScheme='blue'
        variant='solid'
        borderRadius='16px'
        w='120px'
        h='32px'
        lineHeight='30px'
        fontSize='15px'
        fontWeight='bold'
        m='0 8px 0 8px'
        onClick={onOpen}
      >
        Sign Up
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight='bold'
            bgColor={primaryComponentColor[colorMode]}
          >
            Sign up to Reddit
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={primaryComponentColor[colorMode]}>
            <Formik
              innerRef={registerFormRef}
              children={RegisterForm}
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={DisplayingRegisterErrorMessagesSchema}
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
                  onClose()
                  router.reload()
                } catch (err) {
                  console.error(err)
                }
                setSubmitting(false)
              }}
            />
          </ModalBody>

          <ModalFooter bgColor={primaryComponentColor[colorMode]}>
            <Button
              colorScheme='blue'
              mr='12px'
              onClick={() => {
                submitRegisterForm()
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

export default RegisterFormModal
