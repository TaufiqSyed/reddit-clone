import {
  Box,
  Image,
  useColorMode,
  Text,
  Flex,
  Switch,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  MenuGroup,
  MenuDivider,
  FormControl,
  FormLabel,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { MdPerson, MdExpandMore, MdPhone } from 'react-icons/md'
import { IoPersonCircle, IoChevronDown, IoAdd } from 'react-icons/io5'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import React from 'react'
import { useRouter } from 'next/dist/client/router'

import { IUser } from './interfaces'
import axios from 'axios'

const Navbar: React.FC<{ user: IUser | null; logOut: () => void }> = ({
  user,
  logOut,
}) => {
  const { colorMode } = useColorMode()
  const navbarBgColor = { light: '#fff', dark: 'gray.800' }
  const borderColor = { light: 'gray.400', dark: '#2D3748' }
  const router = useRouter()
  const logInRedirect = () => {
    router.push('/login')
  }
  const signUpRedirect = () => {
    router.push('/register')
  }

  return (
    <Flex
      bgColor={navbarBgColor[colorMode]}
      h='56px'
      w='100%'
      position='fixed'
      top='0'
      right='0'
      alignItems='center'
      borderBottom='1px solid'
      borderColor={borderColor[colorMode]}
      zIndex='2'
    >
      <Image
        position='relative'
        src={`reddit-logo-with-text-on-${colorMode}.svg`}
        alt='reddit logo'
        h='60px'
        m='0 15px'
        display='inline-block'
      />
      {!!user ? (
        <>
          <IconButton
            aria-label='Create post'
            icon={<Icon as={IoAdd} p='-10px' />}
            variant='solid'
            borderRadius='3px'
            m='0 8px'
            size='sm'
            fontSize='20px'
            ml='auto'
            onClick={() => {
              router.push('/submit')
            }}
          />
          {/* <Button
            variant='ghost'
            p='0'
            w='auto'
            h='auto'
            display='inline-block'
          >
            <Center w='32px' h='32px' p='0' m='0'>
              <Icon as={IoAdd} fontSize='20px' p='0' m='0' />
            </Center>
          </Button> */}
          {/* <IconButton
            display='inline-block'
            fontSize='20px'
            aria-label='Create post'
            icon={IoAdd}
          ></IconButton> */}
          <Button
            colorScheme='blue'
            variant='solid'
            borderRadius='16px'
            w='120px'
            h='32px'
            lineHeight='30px'
            fontSize='15px'
            fontWeight='bold'
            m='0 8px'
            onClick={() => logOut()}
          >
            Log Out
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              // fontSize='20px'
              w='150px'
              h='40px'
              m='0 30px 0 8px'
              // colorScheme='blue'
              p='0'
              variant='ghost'
              // display='inline-flex'
              // flexDir='column'
              // justifyContent='center'
              // alighItems='center'
            >
              <Box
                position='relative'
                h='40px'
                w='150px'
                display='inline-flex'
                flexDir='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Box
                  display='inline-flex'
                  flexDir='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Icon
                    as={IoPersonCircle}
                    ml='6px'
                    fontSize='25px'
                    // display='flex'
                    // flexShrink={0}
                  />
                  <Text
                    fontSize='12px'
                    m='-3px 0px 0 6px'
                    display='inline-flex'
                    alignItems='center'
                  >
                    u/{user.username}
                  </Text>
                </Box>

                {/* <Box display='flex' flex={1}></Box> */}

                <Icon
                  as={IoChevronDown}
                  m='0 8px 0 0'
                  fontSize='15px'
                  // display='flex'
                  // flexShrink={0}
                />
              </Box>
            </MenuButton>

            <MenuList>
              <MenuGroup title='Settings'>
                <MenuItem>
                  Dark Mode
                  <Box m='0 0 0 auto'>
                    <DarkModeSwitch />
                  </Box>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Account'>
                <MenuItem onClick={() => logOut()}>Log out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      ) : (
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
            onClick={() => logInRedirect()}
          >
            Log In
          </Button>
          <Button
            colorScheme='blue'
            variant='solid'
            borderRadius='16px'
            w='120px'
            h='32px'
            lineHeight='30px'
            fontSize='15px'
            fontWeight='bold'
            m='0 8px'
            onClick={() => signUpRedirect()}
          >
            Sign Up
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              fontSize='20px'
              w='70px'
              h='32px'
              m='0 30px 0 8px'
              colorScheme='blue'
              variant='ghost'
              display='inline-flex'
              alignItems='center'
              justifyContent='center'
            >
              <Icon as={MdPerson} />
              <Icon as={MdExpandMore} />
            </MenuButton>

            <MenuList>
              <MenuGroup title='Settings'>
                <MenuItem>
                  Dark Mode
                  <Box m='0 0 0 auto'>
                    <DarkModeSwitch />
                  </Box>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Account'>
                <MenuItem onClick={() => logInRedirect()}>Log in</MenuItem>
                <MenuItem onClick={() => signUpRedirect()}>Sign up</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      )}
    </Flex>
  )
}
export default Navbar
