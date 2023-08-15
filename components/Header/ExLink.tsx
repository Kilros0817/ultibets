import {
  Text,
} from '@chakra-ui/react'
import { useState, useEffect, } from 'react';

type ExLinkProps = {
  href: string
  name: string
  onClose?: () => void
  footer?: boolean
}

export default function ExLink({ name, href, onClose, footer }: ExLinkProps) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])
  return (
      <Text
        _focus={{
          border: 'none',
          color: '#E18833',
        }}
        _hover={{
          color: '#E18833',
        }}
        onClick={onClose}
        fontSize={footer ? '14px' : width < 1400 ? '14px' : '16px'}
        fontFamily={'Nunito'}
        fontWeight={'bold'}
        textAlign='start'
        width={['unset', 'unset', 'unset', 'unset', 'unset']}
        className='header-navlink-item-wrapper'
      >
        <a 
          href={href}
          target="_new"
        >
          {name}
        </a>
      </Text>
  )
}
