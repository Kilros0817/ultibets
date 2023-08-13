/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, } from '@chakra-ui/react'
import React from 'react'
type SquidGridProps = {
  limit: number
  current: number
}

const SquidGrid = ({
  limit,
  current,
}: SquidGridProps) => {
  const players = Array.from({ length: limit + 1 }, (_, i) => ({
    name: `Player ${i + 1}`,
    score: 100,
    active: i <= (current ?? 0),
  }))

  return (
    <>
      <Box
        width={'fit-content'}
        display={['none', 'none', 'none', 'block']}
      >
        {' '}
        <Grid
          templateColumns={[
            'unset',
            'unset',
            'unset',
            'repeat(35, 1fr)',
            'repeat(50, 1fr)'
          ]}
        >
          {
            players.slice(1).map((dot, index) => (
              <Box
                key={index}
                width={'12px'}
                height={'12px'}
                background={dot.active ? '#FF9100' : '#3D3D3D'}
                borderRadius={'50%'}
                margin={'5px'}
              />
            ))
          }
        </Grid>
      </Box>

      
    </>
  )
}

export default SquidGrid
