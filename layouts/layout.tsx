import { Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import ContextProvider from "../utils/ContextProvider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children }: any) => {

  return (
    <Flex
      minHeight='100vh'
      display='flex !important'
      flexDirection='column'
    >
      <ContextProvider>
        <>
          <Header />
          <Flex
            flexGrow='1 !important'
            justifyContent='center'
          >
            {children}
          </Flex>
          <Footer />
        </>
      </ContextProvider>
    </Flex>
  )
}

export default Layout
