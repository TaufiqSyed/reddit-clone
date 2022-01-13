import {
  Box,
  Input,
  Icon,
  useColorMode,
  useToken,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import axios from 'axios'
import { Formik, Form, FormikProps } from 'formik'
import React, { useRef } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { inputColor, primaryBorderColor, primaryComponentColor } from './colors'
import { ICreatePost } from './interfaces'

const CreatePostForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
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
          autoComplete='off'
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
    </Form>
  )
}

const CreatePostModal: React.FC<{ fetchPosts: () => Promise<void> }> = ({
  fetchPosts,
}) => {
  const [gray500] = useToken('colors', ['gray.500'])
  const formRef = useRef<FormikProps<ICreatePost>>()
  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode } = useColorMode()
  return (
    <>
      <Box
        display='flex'
        w='100%'
        m='0 auto 16px auto'
        maxW='700px'
        minW='482x'
        h='58px'
        border='1px solid'
        borderColor={primaryBorderColor[colorMode]}
        borderRadius='5px'
        flexDir='row'
        alignItems='center'
        bgColor={primaryComponentColor[colorMode]}
        _hover={{ borderColor: gray500 }}
        p='0 10px 0 10px'
      >
        <Icon as={IoPersonCircle} fontSize='42px' mr='8px' color='gray.300' />

        <Button
          p='0 0 0 12px'
          w='100%'
          onClick={onOpen}
          color='gray.500'
          flexDir='column'
          alignItems='flex-start'
          bgColor={inputColor[colorMode]}
          _hover={{ cursor: 'text' }}
          fontWeight='normal'
        >
          Create Post
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgColor={primaryComponentColor[colorMode]}
            fontWeight='bold'
          >
            Create a post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={primaryComponentColor[colorMode]}>
            <Formik
              innerRef={formRef}
              children={CreatePostForm}
              initialValues={{
                title: '',
                content: '',
              }}
              onSubmit={async values => {
                try {
                  await axios.post(
                    'http://localhost:3001/api/v1/posts',
                    {
                      title: values.title,
                      content: values.content,
                    },
                    { withCredentials: true }
                  )
                } catch (err) {
                  console.error(err)
                }
                onClose()
                fetchPosts()
              }}
            ></Formik>
          </ModalBody>
          <ModalFooter pt='0' bgColor={primaryComponentColor[colorMode]}>
            <Button
              colorScheme='blue'
              mr='12px'
              onClick={() => {
                submitForm()
              }}
            >
              Post
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

export default CreatePostModal
