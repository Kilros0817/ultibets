import {
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import React from 'react'

type AdminHandleEventButtonProps = {
  setRepeatLevel: (repeatLevel: number) => void,
  onOpenModal: () => void,
  buttonLabel: string,
  isExpired?: boolean
}

const AdminHandleEventButton = ({
  setRepeatLevel,
  onOpenModal,
  buttonLabel,
  isExpired = false,
}: AdminHandleEventButtonProps) => {

  return <Flex
    direction={'row'}
    alignItems='center'
    justifyContent='space-between'
    px={'0'}
    backgroundColor='transparent'
    _focus={{
      backgroundColor: 'transparent',
    }}
    _active={{
      backgroundColor: 'transparent',
    }}
    _hover={{
      backgroundColor: 'transparent',
    }}
    className='admin-handle-event-button'
  >
    <Menu
    >
      <MenuButton
        as={Button}
        backgroundColor='transparent'
        _hover={{
          backgroundColor: '#FC541C',
        }}
        _focus={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: '#FC541C',
        }}
        px={isExpired ? '10px' : '25px'}
        py={isExpired ? '10px' : '8px'}
        height={isExpired ? '30px' : '41px'}
        borderRadius={isExpired ? '15px' : '34px'}
        border={'1px solid #FC541C'}
        zIndex={5}
      >
        <Flex
          direction='row'
          alignSelf='center'
          alignItems='center'
        >
          <Text
            fontFamily={'Nunito'}
            fontStyle='normal'
            fontSize={isExpired ? '12px' : '15px'}
            lineHeight={isExpired ? '14px' : '25px'}
            textTransform={'capitalize'}
            flex='none'
            color={'white'}
            flexGrow={'0'}
          >
            {buttonLabel}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList
        backgroundColor={'#1F1F1F'}
        minWidth='min-content'
        width='150px'
        zIndex={'3'}
      >
        {
          ['Multichain', 'Singlechain', 'Individual'].map((item, index) => (
            <MenuItem
              backgroundColor={'#1F1F1F'}
              _hover={{
                backgroundColor: '#E18833;',
              }}
              _focus={{
                backgroundColor: '#E18833;',
              }}
              onClick={() => {
                setRepeatLevel(2 - index);
                onOpenModal();
              }}
              key={index}
              fontFamily='Nunito'
              fontStyle='normal'
              fontWeight='700'
              fontSize='16px'
              lineHeight='16px'
              paddingLeft='15px'
            >
              <Text
                fontFamily={'Nunito'}
                fontStyle='normal'
                fontSize={'15px'}
                lineHeight='25px'
                textTransform={'capitalize'}
                flex='none'
                color={'white'}
                flexGrow={'0'}
                mr='14px'
              >
                {item}
              </Text>
            </MenuItem>
          ))
        }
      </MenuList>
    </Menu>
  </Flex>
};

export default AdminHandleEventButton;