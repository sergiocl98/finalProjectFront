import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const About = () => {
  return (
    <Flex flexDir="column">
      <Flex
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="200px"
        backgroundImage="url('/img/Capa 4.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        objectFit="cover"
        boxShadow="lg"
      >
        <Heading as="h2" color="white">
          Reserve, Quick and Easy!
        </Heading>
      </Flex>
      <Box bg="#edeef0" w="100%" h="auto" mt="20px">
        <Flex p="2rem" flexDir="column" justifyContent="center">
          <Flex>
            <Text mt="10px" fontSize="20px" fontWeight="bold" color="orange">
              Dining Room App
            </Text>
          </Flex>
          <Flex justifyContent="flex-start">
            <Text mt="15px" lineHeight="30px">
              This initiative arises to save time when reserving a table in the
              establishment of your choice, in an easy and fast. With this
              service you will have a list of places based on your location and
              the number of people who they want to book. You will also have a
              number of tables available with that counts the establishment in
              real time.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default About;
