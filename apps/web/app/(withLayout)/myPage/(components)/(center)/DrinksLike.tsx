'use client';

import { useDrinksLikeListQuery } from '@/hooks/queries/useDrinksLikeListQuery';
import { MyUserInfo } from '@/types/userInfo';
import { Box, Flex, Grid, Rating, Text, UnstyledButton } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import classes from './center.module.scss';
import Link from 'next/link';
import LikeButton from '@/components/button/LikeButton';

const MyPageDrinkList = () => {
  const { data, fetchNextPage, hasNextPage } = useDrinksLikeListQuery({
    size: 9,
  });
  console.log(data);

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.3,
  });
  useEffect(() => {
    if (entry && entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  return (
    <>
      <Grid w={'100%'} gutter={24} mt={24} mb={24}>
        {data &&
          data.pages &&
          data.pages.map((v, index) => (
            <Fragment key={index}>
              {v.page_info.total_elements === 0 ? (
                <Flex
                  mt={16}
                  w={`100%`}
                  h={`100%`}
                  justify={`center`}
                  align={`center`}
                  direction={`column`}
                >
                  <Box mb={16}>아직 좋아하는 주류가 없어요!</Box>
                  <Box>
                    <Image
                      src={`/noContent.svg`}
                      alt='아무것도 없다'
                      width={288}
                      height={320}
                    />
                  </Box>
                </Flex>
              ) : (
                <>
                  {v.drinks.map(e => {
                    return (
                      <Grid.Col
                        key={e.drink_id}
                        w={'100%'}
                        span={{ base: 6, sm: 4 }}
                        className={classes['review-grid-col']}
                      >
                        <Flex gap={16} direction={'column'}>
                          <Flex
                            w={'100%'}
                            pb={'73.4%'}
                            pos={'relative'}
                            style={{
                              boxShadow: '0px 4px 20px 0px #00000033',
                              borderRadius: '12px',
                            }}
                          >
                            <Link href={`/drink/${e.drink_id}`}>
                              <Image
                                src={
                                  e.image_url !== 'string' &&
                                  e.image_url !== '' &&
                                  e.image_url !== 'imageUrl'
                                    ? e.image_url
                                    : 'https://picsum.photos/392/288.webp'
                                }
                                sizes='512px'
                                fill
                                style={{
                                  objectFit: 'contain',
                                  borderRadius: '12px',
                                }}
                                alt={'image'}
                              />
                            </Link>
                          </Flex>
                          <Flex w={'100%'} direction={'column'}>
                            <Flex>
                              <Flex direction='column'>
                                <Flex
                                  className={
                                    classes['drink-content-maker-title']
                                  }
                                >
                                  <UnstyledButton
                                    component='a'
                                    href={`/drink/${e.drink_id}`}
                                  >
                                    <Text>{e.manufacturer_name}</Text>
                                  </UnstyledButton>
                                </Flex>
                                <Flex>
                                  <UnstyledButton
                                    component='a'
                                    href={`/drink/${e.drink_id}`}
                                  >
                                    <Text>{e.drink_name}</Text>
                                  </UnstyledButton>
                                </Flex>
                              </Flex>
                              <Flex ml={'auto'} align={'center'}>
                                <LikeButton
                                  drink_like={e.drink_like}
                                  drink_id={e.drink_id}
                                  isMyPage={true}
                                />
                              </Flex>
                            </Flex>
                          </Flex>
                          <Rating
                            value={e.review_rating}
                            fractions={2}
                            readOnly
                          />
                        </Flex>
                      </Grid.Col>
                    );
                  })}
                </>
              )}
            </Fragment>
          ))}
      </Grid>
      <div ref={ref}></div>
    </>
  );
};

export default MyPageDrinkList;
