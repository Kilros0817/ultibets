import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState, } from 'react'
import { sidebarItems } from '../../utils/config'
import SideLink from './SideLink'

const Sidebar = () => {
  const router = useRouter()
  const [marginTop, setMarginTop] = useState('30px');
  const currentRoute = router.pathname

  useEffect(() => {
    const currentRoute = router.pathname
    switch (currentRoute) {
      default:
        setMarginTop('30px');
    }
  }, [router])

  return (
    <>
      {
        currentRoute !== '/disclaimer' ? (
          <Flex
            m={'20px'}
            marginTop={marginTop}
            gap={'10px'}
            display='flex'
            flexDirection={'column'}
            cursor="pointer"
            zIndex={1}
            className='sidebar-component'
          >
            {
              Object.entries(sidebarItems).map(([key, value]) => (
                <div key={value.menuIndex}>
                  <SideLink
                    categoryOfThisItem={value.menuIndex}
                    name={value.name}
                    icon={value.icon}
                    isSubCategoryExist={value.isSubCategoryExist}
                  />
                </div>
              ))
            }
          </Flex>
        ) : null}
    </>
  )
}

export default Sidebar
