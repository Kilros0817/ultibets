import {
  Flex,
  Text,
  Image
} from '@chakra-ui/react'

export type StepBarProps = {
  category?: string
  value?: number
  percent: number
  fakePercent: number
  color: string
  background: string
  isSquid?: boolean
  currentToken?: string
}

const StepBar = ({
  category,
  value,
  percent,
  fakePercent,
  color,
  background,
  isSquid,
  currentToken,
}: StepBarProps) => {

  return (
    <>
      {
        fakePercent > 0 && (
          <Flex
            direction='column'
            alignItems='end'
            width={`${fakePercent}%`}
            mr='1'
          >
            {
              value && (
                <Text
                  fontFamily={'Nunito'}
                  fontWeight={['400', '700']}
                  fontSize={['10px', '14px']}
                  lineHeight={['12px', '30px']}
                  color={'white'}
                  textTransform={'capitalize'}
                  height={['25px', '30px']}
                  mb={['5px', '0']}
                  display={'flex'}
                  alignItems={'flex-start'}
                >
                  {value} {currentToken}
                </Text>
              )
            }
            <Flex
              width='100%'
              height={['3px', '4px']}
              backgroundColor={color}
              border={`1px solid ${color}`}
              mb={['5px', '10px']}
            />
            <Text
              fontFamily={'Nunito'}
              fontWeight={['400', '700']}
              fontSize={['10px', '12px']}
              lineHeight={['12px', '30px']}
              color={'white'}
              textTransform={'capitalize'}
              mr='3'
              mt={['5px', '0px']}
              position='relative'
            >
              <Image
                src={background}
                position='absolute'
                top={isSquid ? '-90px' : '-42px'}
                left={isSquid ? '-48px' : '33px'}
                zIndex='0'
                maxWidth={isSquid ? '230%' : '100%'}
              />
              {category}
            </Text>
            <Text
              fontFamily={'Nunito'}
              fontWeight={['600', '700']}
              fontSize={['13px', '18px']}
              lineHeight={['16px', '30px']}
              color={color}
              textTransform={'capitalize'}
              textAlign={'right'}
              mr='3'
              mt={['5px', '0px']}
            >
              {percent}%
            </Text>
          </Flex>
        )
      }
    </>
  )
}

export default StepBar;