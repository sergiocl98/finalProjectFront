import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Image,
  HStack,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { MapTrifold } from 'phosphor-react';
import LocalService from '../../services/localService';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import TableIcon from '../../shared/img/TableIcon.png';
import RestaurantDefault from '../../shared/img/restaurantDefault.jpg';

const getSiteData = async (id, setSiteData) => {
  const res = await LocalService.getLocalById(id);
  setSiteData(res);
};

const handleGetDirections = siteData => {
  //link para visitar ese sitio en google maps
  window.open(
    `https://www.google.com/maps/dir//${siteData.coords.lat},${siteData.coords.lng}/?travelmode=walking`,
    '_blank'
  );
};

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const Detail = () => {
  const { id } = useParams();

  const [siteData, setSiteData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleGo = (url) => {
    navigate(url);
  };
  const idLocal = useParams(id);


  useEffect(() => {
    getSiteData(id, setSiteData);
  }, [id]);
  
  return (
    <Box>
      <HeaderPage
        title={'Detail'}
        description={'Information about restaurant.'}
        hasGoBack
        urlBack={'/home'}
      />

      {siteData ? (
        <Container maxW={'5xl'} p={12} bgColor={'white'} borderRadius={10}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <HStack>
                {siteData?.tags.map(tag => (
                  <Text
                    key={tag}
                    textTransform={'uppercase'}
                    color={'orange.400'}
                    fontWeight={600}
                    fontSize={'sm'}
                    bg="orange.50"
                    p={2}
                    alignSelf={'flex-start'}
                    rounded={'md'}
                  >
                    {tag}
                  </Text>
                ))}
              </HStack>
              <Heading>{siteData?.name}</Heading>
              <Flex onClick={() => handleGetDirections(siteData)}>
                <Text color={'gray.500'} fontSize={'lg'} mr="4px">
                  {siteData?.address}
                </Text>
                <MapTrifold size={26} weight="regular" color={'orange'} />
              </Flex>
              <Text color={'gray.500'} fontSize={'lg'}>
                {siteData?.description}
              </Text>
              <Stack
                spacing={4}
                divider={<StackDivider borderColor={'gray.100'} />}
                mb="30px"
              >
                <Feature
                  icon={
                    <Image
                      src={TableIcon}
                      alt="TableIcon"
                      width={5}
                      height={5}
                    />
                  }
                  iconBg={'yellow.100'}
                  text={'Total tables: ' + siteData?.bookings.length}
                />
              </Stack>
              <HStack pt={'40px'}>
                <Button
                  variant="secondary2"
                  mr="20px"
                  onClick={onOpen}
                  isDisabled={siteData?.menu === undefined}
                >
                  Open Menu
                </Button>
                <Button variant="primary" onClick={() => handleGo(`/book/${idLocal}`)}>Book a table</Button>
              </HStack>
            </Stack>
            <Flex>
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={siteData?.image || RestaurantDefault}
                objectFit={'cover'}
              />
            </Flex>
          </SimpleGrid>
        </Container>
      ) : (
        <Flex justify={'center'}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Flex>
      )}

      <Modal onClose={onClose} isOpen={isOpen} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image alt={'menu'} src={siteData?.menu} objectFit={'cover'} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Detail;
