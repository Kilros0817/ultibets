import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  item1: string;
  item2: string;
  item3?: string;
  item4?: string;
  item5?: string;
  item6?: string;
  item7?: string;
};
const Content = ({ title, subtitle, item1, item2, item3, item4, item5, item6, item7 }: Props) => {
  return (
    <Flex
      zIndex={10}
      direction={'column'}
      mt={'10px'}
      mb={['6px', '5px']}
      width={'300px'}
      height={['400px', '350px', 'auto', 'auto']}
    >
      <Flex>
        <Text
          fontStyle={'normal'}
          fontWeight={800}
          fontSize={'32px'}
          lineHeight={'39px'}
          textTransform={'capitalize'}
          color={'#FFB11C'}
        >
          {title && title}
        </Text>
      </Flex>
      <Flex>
        <Text
          mt={'25px'}
          fontStyle={'normal'}
          fontWeight={800}
          fontSize={'21px'}
          lineHeight={'25px'}
          textTransform={'capitalize'}
          color={'#FFFFFF'}
        >
          {subtitle && subtitle}
        </Text>
      </Flex>
      <Flex px={'17px'} mt={'15px'}>
        <ul>
          {item1 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {item1 && item1}
              </Text>
            </li>
          )}
          {item2 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {item2 && item2}
              </Text>
            </li>
          )}
          {item3 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {' '}
                {item3 && item3}
              </Text>
            </li>
          )}
          {item4 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {' '}
                {item4 && item4}
              </Text>
            </li>
          )}
          {item5 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {' '}
                {item5 && item5}
              </Text>
            </li>
          )}
          {item6 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {' '}
                {item6 && item6}
              </Text>
            </li>
          )}
          {item7 && (
            <li>
              <Text
                fontStyle={'normal'}
                fontWeight={700}
                fontSize={'16px'}
                lineHeight={'22px'}
                textTransform={'capitalize'}
                color={'#FFFFFF'}
              >
                {' '}
                {item7 && item7}
              </Text>
            </li>
          )}
        </ul>
      </Flex>
    </Flex>
  );
};

export default Content;
