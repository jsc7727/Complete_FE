'use client'
import { Button, Flex, Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
const CustomDropZone = (props: Partial<DropzoneProps>) => {
    return (
        <Dropzone
            onDrop={() => { }}
            {...props}
        >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <IconUpload
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                        stroke={1.5}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                        stroke={1.5}
                    />
                </Dropzone.Reject>
                {/*  <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div> */}
                <Flex w={384} h={384} bg={'#E5E6E8'} justify={'center'} align={'center'} gap={16} direction={'column'}>
                    <Flex direction={'column'} gap={8} justify={'center'} align={'center'} >
                        <Image
                            src={'/icons/카메라.svg'}
                            alt='camera'
                            width={24}
                            height={24}
                        />
                        <Flex fz={16} fw={500} lh={'16px'}>사진을 업로드해줏세요</Flex>
                    </Flex>
                    <Button w={179} h={40} radius={8} px={16} py={12} bg={'white'} c={'#000000A6'} fz={16} fw={500} lh={'16px'}>클릭해서 사진 불러오기</Button>
                </Flex>
            </Group>
        </Dropzone>
    );
}
export default CustomDropZone;