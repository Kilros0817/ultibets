import {
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, } from 'react';
import { useChainContext } from '../../utils/Context';

type NavlinkProps = {
  href: string
  name: string
  onClose?: () => void
  footer?: boolean
}

export default function NavLink({ name, href, onClose, footer }: NavlinkProps) {
  const router = useRouter()
  const currentRoute = router.pathname
  const [width, setWidth] = useState(0);
  const { setCategoryInPM, setSubCategoryInPM } = useChainContext();
  const initPM = () => {
    setCategoryInPM(0)
    setSubCategoryInPM(0)
  }
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])
  return (

    <NextLink href={href} passHref>
      <Link
        color={currentRoute === href ? '#E18833' : 'white'}
        _focus={{
          border: 'none',
          color: '#E18833',
        }}
        _hover={{
          color: '#E18833',
        }}
        onClick={initPM}
        fontSize={footer ? '14px' : width < 1400 ? '14px' : '16px'}
        fontFamily={'Nunito'}
        fontWeight={'bold'}
        textAlign='start'
        width={['unset', 'unset', 'unset', 'unset', 'unset']}
        className='header-navlink-item-wrapper'
      >
        {name}
      </Link>
    </NextLink >
  )
}
