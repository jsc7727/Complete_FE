'use client';

import { Box, Flex, Text } from '@mantine/core';
import { ChipButton } from '@team-complete/complete-ui';
import classes from './AnotherDrink.module.scss';
import { useState } from 'react';
import AnotherDrinkList from './List';

const AnotherDrink = ({
  anotherDrinkRef,
  detailId,
}: {
  anotherDrinkRef: React.RefObject<HTMLHeadingElement> | null;
  detailId: number;
}) => {
  const [activeState, setActiveState] = useState<
    'situation' | 'taste' | 'flavor'
  >('flavor');

  const activeStateHandler = (value: 'situation' | 'taste' | 'flavor') => {
    setActiveState(value);
  };
  return (
    <Box w={'100%'} className={classes.AnotherDrinkWrapper}>
      <Flex
        justify={'space-between'}
        w={'100%'}
        // h={'3rem'}
        align={'center'}
        className={classes.TitleWrapper}
      >
        <Text
          component='h1'
          lh={'40px'}
          
          fw={800}
          ref={anotherDrinkRef}
        >
          비슷한 평가를 받은 주류를 알려드릴게요!
        </Text>
        <Box className={classes.ButtonWrapper}>
          <ChipButton
            variant={'primary'}
            onClick={() => {
              activeStateHandler('situation');
            }}
            className={
              activeState === 'situation'
                ? classes['ChipButtonArea-active']
                : classes.ChipButtonArea
            }
          >
            누구랑
          </ChipButton>
          <ChipButton
            onClick={() => {
              activeStateHandler('taste');
            }}
            variant={'primary'}
            className={
              activeState === 'taste'
                ? classes['ChipButtonArea-active']
                : classes.ChipButtonArea
            }
          >
            맛
          </ChipButton>
          <ChipButton
            onClick={() => {
              activeStateHandler('flavor');
            }}
            variant={'primary'}
            className={
              activeState === 'flavor'
                ? classes['ChipButtonArea-active']
                : classes.ChipButtonArea
            }
          >
            향
          </ChipButton>
        </Box>
      </Flex>
      <Box>
        <AnotherDrinkList detailId={detailId} rateName={activeState} />
      </Box>
    </Box>
  );
};

export default AnotherDrink;
