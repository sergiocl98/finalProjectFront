import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { Camera, Flask, GameController} from 'phosphor-react';
import React from 'react';
import GuillermoPicture from '../../shared/img/Guillermo2.jpg';
import SergioPicture from '../../shared/img/Sergio.jpg';
import JosePicture from '../../shared/img/Jose.png';
import ProfileCard from "../../components/ProfileCard/ProfileCard"


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
        <Heading as="h2" color="white" textAlign={"center"}>
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
      <Center w="auto" h="auto" mt="30px">
      <Flex alignItems='center' flexDir={'column'} justifyContent='center'>
        <Text fontSize="36px" fontWeight="bold" color="orange"> Our Team </Text>
        <Flex justifyContent='space-between' alignItems={'center'} mt="10px" flexDirection={{base: 'column', md: 'row'}}>
          <ProfileCard name='Guillermo Piñate' img={GuillermoPicture} description='Full Stack Developer, Designer and Photograph' address='Pontevedra, Spain' work='Interfoto' email='gpinate@gmail.com' hashtag='Photograph' hashtagIcon={<Camera size={32} color="#edeef0" weight="thin" />}  />
          <ProfileCard name='Sergio Carmona' img={SergioPicture} description='Full Stack Developer working as Frontend Developer in IoBuilders' address='Madrid, Spain' work='IoBuilders' email='scarmonalorente@gmail.com' hashtag='Gamer' hashtagIcon={<GameController size={32} color="#edeef0" weight="thin" />} />
          <ProfileCard name='Jose Ignacio Labella' img={JosePicture} description='Full Stack Developer and Researcher at the university' address='Alicante, Spain' work='University' email='ls.joseignacio@gmail.com' hashtag='Scientist' hashtagIcon={<Flask size={32} color="#edeef0" weight="thin" />} />
        </Flex>
      </Flex>
      </Center>
    </Flex>
  );
};

export default About;
