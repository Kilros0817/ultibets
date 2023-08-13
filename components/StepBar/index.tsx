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
                  fontWeight={'700'}
                  fontSize={'14px'}
                  lineHeight={'30px'}
                  color={'white'}
                  textTransform={'capitalize'}
                >
                  {value} {currentToken}
                </Text>
              )
            }
            <Flex
              width='100%'
              height={'4px'}
              backgroundColor={color}
              border={`1px solid ${color}`}
              mb='5'
            />
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'12px'}
              lineHeight={'30px'}
              color={'white'}
              textTransform={'capitalize'}
              mr='3'
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
              fontWeight={'700'}
              fontSize={'18px'}
              lineHeight={'30px'}
              color={color}
              textTransform={'capitalize'}
              textAlign={'right'}
              mr='3'
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