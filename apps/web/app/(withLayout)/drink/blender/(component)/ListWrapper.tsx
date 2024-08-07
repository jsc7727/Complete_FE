import { Box, Flex, Text } from '@mantine/core';

import classes from './List.module.scss';
import BlenderList from './List';
import BlenderListSearchWrapper from './SearchWrapper';

const BlenderListWrapper = () => {
  return (
    <Box w={'100%'} h={'100%'}>
      <Flex justify={`space-between`}>
        <Flex>
          <Text lh={`2.5rem`} fw={800} fz={`1.5rem`} mr={`0.5rem`}>
            칠러들의
          </Text>
          <Text
            lh={`2.5rem`}
            fw={800}
            fz={`1.5rem`}
            mr={`0.5rem`}
            className={classes.text}
          >
            본격 한 잔을
          </Text>
          <Text lh={`2.5rem`} fw={800} fz={`1.5rem`} mr={`0.5rem`}>
            소개할게요!
          </Text>
        </Flex>
        <Flex justify={`center`} align={`center`}>
          <BlenderListSearchWrapper />
        </Flex>
      </Flex>
      <Box w={`100%`} h={`100%`}>
        <BlenderList />
      </Box>
    </Box>
  );
};

export default BlenderListWrapper;
