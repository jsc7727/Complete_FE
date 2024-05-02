'use client';
import { Anchor, Box, Center, Flex } from '@mantine/core';
import HeaderWriteButton from './WriteButton';
import Link from 'next/link';
import Logo from '@/components/Logo';
import classes from './SearchBar.module.scss';
import HeaderCenterSearchInput from './SearchInput';
import HeaderMyInfoWrapper from '../MyInfoWrapper';

const HeaderCenterWrapper = ({
  isCenter,
  isLogin,
}: {
  isCenter: boolean;
  isLogin: boolean;
}) => {
  return (
    <Center w={`100%`} h={`100%`}>
      <Flex
        maw={`1224px`}
        align={`center`}
        w={`100%`}
        h={`100%`}
        justify={'center'}
        gap={'13rem'}
      >
        <Flex h={`5rem`} align={'center'} gap={'2.5rem'}>
          <Link href='/'>
            <Logo />
          </Link>
          {!isCenter && <HeaderCenterSearchInput />}
        </Flex>
        {!isCenter && (!isLogin ? (
          <Flex h={'100%'} align={'center'}>
            <Anchor
              href={'/login'}
              component={Link}
              className={classes['header-nav-sns-login-button']}
            >
              <Box
                className={classes['header-nav-sns-login-button-inside-div']}
              >
                소셜 로그인
              </Box>
            </Anchor>
            <HeaderWriteButton />
          </Flex>
        ) : (
          <HeaderMyInfoWrapper></HeaderMyInfoWrapper>
        ))}
      </Flex>
    </Center>
  );
};

export default HeaderCenterWrapper;