import { Box, Icon, Text , Flex, Image} from '@chakra-ui/react'
import { Briefcase, EnvelopeSimple, GameController, MapPinLine } from 'phosphor-react';
import React from 'react';

const ProfileCard = ({
    name,
    img,
    description,
    address,
    work,
    email,
    hashtag,
    hashtagIcon,
    objectPosition='top'
}) => {
  return (
    <Box
        p={50}
        w="full"
        >
        <Box
            w="320px"
            mx="auto"
            bg="white"
            _dark={{
            bg: "gray.800",
            }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
        >
            <Image
            w="full"
            h={56}
            objectFit={'cover'}
            objectPosition={objectPosition}
            src={img}
            alt={name}
            />

            <Flex alignItems="center" px={6} py={3} bg="gray.900">
            {hashtagIcon}

            <Text mx={3} color="white" fontWeight="bold" fontSize="lg">
                {hashtag}
            </Text>
            </Flex>

            <Box py={4} px={6}>
            <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                _dark={{
                color: "white",
                }}
            >
                {name}
            </Text>

            <Text
                py={2}
                color="gray.700"
                _dark={{
                color: "gray.400",
                }}
            >
                {description}
            </Text>

            <Flex
                alignItems="center"
                mt={4}
                color="gray.700"
                _dark={{
                color: "gray.200",
                }}
            >
                <Briefcase size={32} color="#050505" weight="light" />

                <Text px={2} fontSize="sm">
                    {work}
                </Text>
            </Flex>

            <Flex
                alignItems="center"
                mt={4}
                color="gray.700"
                _dark={{
                color: "gray.200",
                }}
            >
               <MapPinLine size={32} color="#050505" weight="light" />

                <Text px={2} fontSize="sm">
                {address}
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                mt={4}
                color="gray.700"
                _dark={{
                color: "gray.200",
                }}
            >
                <EnvelopeSimple size={32} color="#050505" weight="light" />

                <Text px={2} fontSize="sm">
                {email}
                </Text>
            </Flex>
            </Box>
        </Box>
        </Box>

  )
}

export default ProfileCard