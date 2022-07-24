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
          ¡Reserva , Rápido y Fácil!
        </Heading>
      </Flex>
      <Box bg="#edeef0" w="100%" h="200px" mt="20px">
        <Flex p="1rem" flexDir="column" justifyContent="center">
          <Flex>
            <Text fontSize="20px" fontWeight="bold" color="orange">
              Dining Room App
            </Text>
          </Flex>
          <Flex justifyContent="flex-start">
            <Text lineHeight="30px">
              Esta iniciativa surge para Ahórrate tiempo a la hora reservar una
              mesa en el establecimiento de tu preferencia, de manera fácil y
              rápida. Con este servicio dispondrás de una lista de locales
              recomendados en función tu ubicación y la cantidad de personas que
              desean reservar. También tendrás cantidad de mesas disponibles con
              que cuenta el establecimiento en tiempo real.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default About;
