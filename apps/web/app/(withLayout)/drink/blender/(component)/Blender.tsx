'use client';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import Image from 'next/image';
import heart from '@/assets/heart.svg';
import bookmark from '@/assets/bookmark.svg';
import blenderClasses from './Blender.module.scss';
import { useBlenderDetailQuery } from '@/hooks/queries/blenders/useBlenderDetailQuery';
import { useParams } from 'next/navigation';
import { formattedDate } from '@/utils/formattedDate';
import { date } from 'zod';
import { Fragment } from 'react';
import BlenderDrinkListCard from './DrinkList';
import Point from '@/assets/Point';
import { useDeleteBlenderMutation } from '@/hooks/mutates/useBlenderMutate';
import BlenderLikeButton from '@/components/button/BlenderLikeButton';
import BlenderBookmarkButton from '@/components/button/BlenderBookmarkButton';

const Blender = () => {
  const detailId = useParams<{ detail: string }>()!;
  const { data } = useBlenderDetailQuery({
    detailId: parseInt(detailId?.detail),
  });
  console.log(data);
  const { mutate: deleteMutate } = useDeleteBlenderMutation();
  if (data) {
    return (
      <Flex w={600} direction={'column'} gap={12}>
        <Flex w={'100%'} h={600} bg={'#D9D9D9'}>
          빈 그림
        </Flex>
        <Flex direction={'column'} gap={12} my={12}>
          <Flex fz={18} fw={800} lh={'40px'}>
            {data.title}
          </Flex>
          <Flex align={'center'} gap={12} w={'100%'}>
            <Avatar size={40} radius={'100%'} src={data.profile_image_url} />
            <Flex direction={'column'} w={'100%'} gap={4}>
              <Flex fz={14} fw={400} lh={'16px'}>
                {data.nickname}
              </Flex>
              <Flex fz={14} fw={400} lh={'16px'}>
                {formattedDate(data.created_date)}
              </Flex>
            </Flex>
            <Flex w={24} h={'100%'}>
              <Menu position='bottom-end'>
                <Menu.Target>
                  <UnstyledButton>
                    <Image
                      src={'/icons/더보기.svg'}
                      width={24}
                      height={24}
                      alt={'더보기'}
                    />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown w={'11.6rem'}>
                  <Menu.Item
                    fw={'1rem'}
                    lh={'1rem'}
                    px={'6px'}
                    py={'12px'}
                    color={'rgba(0, 0, 0, 0.65)'}
                  >
                    수정하기
                  </Menu.Item>
                  <Menu.Item
                    fw={'1rem'}
                    lh={'1rem'}
                    px={'6px'}
                    py={'12px'}
                    color={'rgba(0, 0, 0, 0.65)'}
                    onClick={() => {
                      deleteMutate({
                        combinationsId: data.combination_board_id,
                      });
                    }}
                  >
                    삭제하기
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Flex>
          <Flex fz={16} fw={400} lh={'24px'}>
            {data.description}
          </Flex>
          <Flex align={'center'} justify={'flex-end'} gap={12}>
            <Flex align={'center'}>
              <BlenderLikeButton
                combinationsId={data.combination_board_id}
                isLike={data.combination_like}
              />
              {data.combination_like_count}
            </Flex>
            <Flex align={'center'}>
              {/* <Image
                src={bookmark}
                alt='bookmark'
                style={{ padding: 8 }}
                width={40}
                height={40}
              /> */}
              <BlenderBookmarkButton
                combinationsId={data.combination_board_id}
                isBookmark={data.combination_bookmark}
              />
              {data.combination_bookmark_count}
            </Flex>
          </Flex>
        </Flex>
        <Divider my={24} />
        <Flex p={24} gap={12} mb={24} direction={'column'}>
          <Flex fz={18} fw={500} lh={'24px'} gap={'0.5rem'} align='center'>
            <Point />
            만드는 방법
          </Flex>
          <Flex fz={16} fw={400} lh={'24px'}>
            {data.content}
          </Flex>
        </Flex>
        <Flex direction={'column'}>
          <Flex
            fz={18}
            fw={500}
            lh={'24px'}
            mb={12}
            align={'center'}
            gap={'0.5rem'}
          >
            <Point /> 사용 재료
          </Flex>
          <Flex mb={24} gap={24}>
            {data.combinations.map((e, i) => (
              <Fragment key={i}>
                <BlenderDrinkListCard
                  drink_id={e.drink_id}
                  drink_like={e.drink_like}
                  drink_name={e.name}
                  image_url={e.image_url}
                  manufacturer_name={e.manufacturer_name}
                />
              </Fragment>
            ))}
          </Flex>
          <Flex fz={16} fw={500} lh={'24px'} mb={24}>
            {' '}
            댓글
          </Flex>
          <Flex gap={20} direction={'column'} w={'100%'}>
            <Flex w={'100%'} gap={8}>
              <Avatar size={24} radius={'100%'} src={''} />
              <Input
                classNames={{ input: blenderClasses['mantine-input'] }}
                w={'100%'}
                rightSectionWidth={'70'}
                rightSection={
                  <Flex fz={14} fw={500} lh={'100%'}>{`(0/250)`}</Flex>
                }
              />
              <Button
                fz={16}
                fw={500}
                lh={'16px'}
                h={40}
                w={60}
                mih={40}
                miw={60}
                m={0}
                p={0}
              >
                입력
              </Button>
            </Flex>
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <Flex
                  key={index}
                  direction={'column'}
                  gap={4}
                  justify={'center'}
                >
                  <Flex gap={12} justify={'center'} align={'center'}>
                    <Avatar size={24} radius={'100%'} src={''} />
                    <Flex w={'100%'} direction={'column'}>
                      <Flex fz={16} fw={500} lh={'24px'}>
                        User Name
                      </Flex>
                      <Flex fz={12} fw={500} lh={'16px'}>
                        00 전
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex fz={16} fw={400} lh={'24px'}>
                    댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자)
                    댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자) 댓글 쓰기 (0/100자)
                    댓글 쓰기 (0/1
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return null;
  }
};
export default Blender;
