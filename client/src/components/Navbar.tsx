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
} from '@chakra-ui/react'
import { MdPerson, MdExpandMore } from 'react-icons/md'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import React from 'react'
import { useRouter } from 'next/dist/client/router'
import { ChevronDownIcon } from '@chakra-ui/icons'

const Navbar: React.FC<{ username: string }> = ({ username }) => {
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
      h='60px'
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
    </Flex>
  )
}
export default Navbar
