import { Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React, { Fragment } from 'react';
import classes from './DetailSummary.module.scss';
import StarScore from '../animation/StarScore';
import { DetailSummarySimpleDrink } from '@/types/drinks';
import { Chip, Button } from '@team-complete/complete-ui';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import ShareButton from '../button/ShareButton';
import LikeButton from '../button/LikeButton';

const drinkOccasionList = [
  { id: 'alone_sum', title: '나 혼자', selectedPeople: 0 },
  { id: 'friend_sum', title: '친구', selectedPeople: 0 },
  { id: 'partner_sum', title: '연인', selectedPeople: 0 },
  { id: 'business_sum', title: '비즈니스', selectedPeople: 0 },
  { id: 'adult_sum', title: '웃어른', selectedPeople: 0 },
];

const DetailSummary = ({
  data,
  accessToken,
  refreshToken,
}: {
  data: DetailSummarySimpleDrink;
  accessToken: RequestCookie | undefined;
  refreshToken: RequestCookie | undefined;
}) => {
  const updatedDrinkOccasionList = drinkOccasionList.map(item => {
    const situationStatisticValue = data.situation_statistic[item.id];
    return {
      ...item,
      selectedPeople:
        situationStatisticValue !== undefined ? situationStatisticValue : 0,
    };
  });
  const sortedUpdatedDrinkOccasionList = updatedDrinkOccasionList
    .sort((a, b) => {
      return -(a.selectedPeople - b.selectedPeople);
    })
    .splice(0, 3);

  return (
    <Flex pos={'relative'} w={'100%'} py={92} justify={'center'} mb={'100px'}>
      <Flex
        w={'100%'}
        maw={1224}
        gap={'128px'}
        align={'center'}
        pos={'relative'}
        className={classes['drink-banner-content-wrapper']}
      >
        <Flex direction={'column'}>
          <Flex
            bg='white'
            w={392}
            h={392}
            className={classes['drink-image']}
            justify={'center'}
            pt={30}
            mb={4}
          >
            <Image
              src={'/beer.svg'}
              alt='맥주'
              width={438.72}
              height={625.58}
            />
          </Flex>
          <Flex ml={'auto'}>
            <Text size='1.125rem' fw={400} lh={'2rem'}>
              이미지 제공
            </Text>
            <Text size='1.125rem' fw={400} lh={'2rem'} c='#E5E6E8' mx={8}>
              |
            </Text>
            <Text size='1.125rem' fw={400} lh={'2rem'}>
              {data.manufacturer.manufacturer_name}
            </Text>
          </Flex>
        </Flex>
        <Flex direction='column' w={'100%'}>
          <Flex justify={'space-between'}>
            <Title size={40} fw={800} lh={'50px'}>
              {data.name}
            </Title>
            <Flex gap={24} align={'center'}>
              {/* TODO: design-system으로 교체 */}
              {accessToken !== undefined && (
                <LikeButton
                  drink_like={data.drink_like}
                  drink_id={data.drink_id}
                />
              )}
              <ShareButton />
            </Flex>
          </Flex>
          <Text
            className={classes['drink-description']}
            size='18px'
            lh={'32px'}
            fw={500}
            py={12}
          >
            {data.summary}
          </Text>
          <Flex py={16} className={classes['drink-description']}>
            <Text w={80} mr={24} size='20px' fw={600} lh={'32px'}>
              유저 평가
            </Text>
            <Flex align={'center'}>
              <StarScore score={data.review_rating} />
              <Text size='1.25rem' fw={700} lh={'1.5rem'} ml={4}>
                {`(${data.review_rating})`}
              </Text>
            </Flex>
          </Flex>

          <Text size={'lg'} fw={600} lh={'32px'} mt={'1rem'} mb={'1rem'}>
            함께하면 좋은 안주
          </Text>
          <Flex gap={24}>
            {data.food_statistics.map((e, idx) => (
              <Fragment key={idx}>
                {e.food_id !== null &&
                  e.category !== null &&
                  e.image_url !== null && (
                    <Chip variant={'ghost'}>
                      <div className={classes['drink-food-image']}>
                        <Image
                          src={e.image_url}
                          alt='음식 아이콘'
                          width={32}
                          height={32}
                        />
                        <div>{e.category}</div>
                      </div>
                    </Chip>
                  )}
              </Fragment>
            ))}
          </Flex>
          <Text size={'lg'} fw={600} lh={'32px'} mt={'1rem'} mb={'8px'}>
            함께 마시면 좋은 사람
          </Text>
          <Flex gap={24}>
            {sortedUpdatedDrinkOccasionList.map(({ id, title }, index) => {
              return (
                <Fragment key={index}>
                  <Chip variant='ghost'>
                    <div className={classes['drink-food-image']}>
                      <Image
                        src={`/detail_who/${id}.svg`}
                        alt='title'
                        width={32}
                        height={32}
                      />
                      <Text size='lg'>{title}</Text>
                    </div>
                  </Chip>
                </Fragment>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
      <Image
        src='/banner/홈-header-맥주.svg'
        fill
        alt='배너'
        objectFit='cover'
      />
    </Flex>
  );
};

export default DetailSummary;
