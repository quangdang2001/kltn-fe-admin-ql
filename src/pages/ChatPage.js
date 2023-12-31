import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Chatbox from '../components/Chatbox'
import MyChats from '../components/MyChats'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import { ChatState } from '../Context/ChatProvider'
import { useSelector } from 'react-redux'

const Chatpage = ({ history }) => {
  const [fetchAgain, setFetchAgain] = useState(false)
  const { user } = ChatState()
  const { userInfo } = useSelector((state) => state.userLogin)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo])
  return (
    <ChakraProvider>
      <div style={{ width: '100%' }}>
        {user && <SideDrawer />}
        <Box
          display='flex'
          d='flex'
          justifyContent='space-between'
          w='100%'
          h='91.5vh'
          p='10px'
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </ChakraProvider>
  )
}
export default Chatpage
