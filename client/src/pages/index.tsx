import { Flex, Spacer } from '@chakra-ui/layout'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Post } from '../components/Post'

const Index = () => (
  <Container height='100vh'>
    <DarkModeSwitch />
    <Post
      id='fdlakfjds;fa'
      title='My first post here'
      body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
      upvotes={0}
      userId={1}
      username='mynamejeff'
    />
    <Post
      id='fdlakfjds;fa'
      title='My second post here'
      body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
      upvotes={0}
      userId={1}
      username='mynamejeff'
    />
    <Post
      id='fdlakfjds;fa'
      title='My third post here'
      body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
      upvotes={0}
      userId={1}
      username='mynamejeff'
    />
    <Post
      id='fdlakfjds;fa'
      title='My fourth post here'
      body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
      upvotes={0}
      userId={1}
      username='mynamejeff'
    />
    <Post
      id='fdlakfjds;fa'
      title='My fifth post here'
      body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
      upvotes={0}
      userId={1}
      username='mynamejeff'
    />
  </Container>
)

export default Index
