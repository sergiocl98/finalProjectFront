import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
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
import { useNavigate, useParams } from 'react-router-dom';
import { MapTrifold, Pencil } from 'phosphor-react';
import LocalService from '../../services/localService';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import TableIcon from '../../shared/img/TableIcon.png';
import RestaurantDefault from '../../shared/img/restaurantDefault.jpg';
import MenuDefault from '../../shared/img/menuDefault.jpeg';
import userService from '../../services/userService';
import LocalForm from '../../components/LocalForm/LocalForm';
import localService from '../../services/localService';

const getSiteData = async id => {
  const res = await LocalService.getLocalById(id);
  return res;
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
  const user = userService.getUser();
  const navigate = useNavigate();
  const handleGo = url => {
    navigate(url);
  };
  const idLocal = useParams(id);

  const [isEdit, setIsEdit] = useState(false);

  const localUser = userService.getUser();
  const [showMap, setShowMap] = useState(false);
  const [localData, setLocalData] = useState({
    user: localUser.userId,
    name: '',
    address: '',
    phone: '',
    description: '',
    tags: '',
    coords: {
      lat: '',
      lng: '',
    },
  });

  const [mapData, setMapData] = useState({
    center: {
      lat: 40.3396472,
      lng: -3.7729584,
    },
    zoom: 9,
    draggable: true,
    lat: 40.3396472,
    lng: -3.7729584,
  });

  const [files, setFiles] = useState([]);
  const [menu, setMenu] = useState([]);

  const handleSave = async () => {
    localData.image = files[0] || RestaurantDefault;
    localData.menu = menu[0] || MenuDefault;

    const formData = new FormData();
    for (const name in localData) {
      formData.append(
        name,
        name === 'coords'
          ? JSON.stringify({ lat: mapData.lat, lng: mapData.lng })
          : localData[name]
      );
    }

    await localService.updateLocal(localData._id, formData);
    setIsEdit(false);
  };

  useEffect(() => {
    getSiteData(id).then(data => {
      setSiteData(data);
      setLocalData(() => {
        return data;
      });
      setMapData(oldValue => {
        return { ...oldValue, lat: data.coords.lat, lng: data.coords.lng };
      });
    });
  }, [id, isEdit]);

  return (
    <Box>
      <HeaderPage
        title={'Detail'}
        description={'Information about restaurant.'}
        hasGoBack
        urlBack={'/home'}
      />

      {siteData ? (
        <Container
          maxW={'5xl'}
          p={12}
          bgColor={'white'}
          borderRadius={10}
          position="relative"
        >
          {siteData.user === user.userId && !isEdit && (
            <Button
              position="absolute"
              right="1rem"
              top="1rem"
              onClick={() => setIsEdit(old => !old)}
            >
              <Pencil size={32} />
            </Button>
          )}
          {!isEdit ? (
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
                <Flex onClick={() => localService.getLocalGoogleMapsURL(siteData._id)}>
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
                    Menu
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleGo(`/book/${idLocal}`)}
                  >
                    Book
                  </Button>
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
          ) : (
            <Box>
              <LocalForm
                localData={localData}
                setLocalData={setLocalData}
                mapData={mapData}
                setMapData={setMapData}
                showMap={showMap}
                setShowMap={setShowMap}
                files={files}
                setFiles={setFiles}
                menu={menu}
                setMenu={setMenu}
                isEdit={true}
                handleSave={handleSave}
              ></LocalForm>
            </Box>
          )}
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
