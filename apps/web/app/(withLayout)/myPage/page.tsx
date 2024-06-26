'use client';

import { useMediaQuery } from '@mantine/hooks';
import MyPageCenterWrapper from './(components)/(center)/Wrapper';
import MyPageLeftSideBarWrapper from './(components)/(sideBar)/Wrapper';
import MyPageTabStore from './(store)/store';
import classes from './MyPageLayout.module.scss';
import { em } from '@mantine/core';
import MobileProfile from './(components)/(mobile)/Profile';
import { useLayoutEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const MyPageWrapper = () => {
  const isMobile = useMediaQuery(`(max-width:${em(768)}`);
  const router = useRouter();
  useLayoutEffect(() => {
    if (!Cookies.get('access_token')) {
      router.push('/');
    }
  }, []);
  return (
    <MyPageTabStore>
      {isMobile ? (
        <div className={classes.MobileMyPageLayout}>
          <MobileProfile />
        </div>
      ) : (
        <div className={classes.MyPageWrapper}>
          <div className={classes.MyPageLeftSideContainer}>
            <MyPageLeftSideBarWrapper />
          </div>
          <div className={classes.Wrapper}>
            <MyPageCenterWrapper />
          </div>
        </div>
      )}
    </MyPageTabStore>
  );
};

export default MyPageWrapper;
