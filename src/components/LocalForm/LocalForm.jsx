import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Marker from '../../containers/Home/Marker';
import GoogleMapReact from 'google-map-react';
import RestaurantDefault from '../../shared/img/restaurantDefault.jpg';
import MenuDefault from '../../shared/img/menuDefault.jpeg';
import Dropzone, { useDropzone } from 'react-dropzone';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import NumberController from '../../components/Form/NumberController';
import { MinusCircle, PlusCircle } from 'phosphor-react';
import localService from '../../services/localService';
import { useNavigate } from 'react-router-dom';
import { mapStyles, apikey } from '../../utils/constants';

const BOOKINGS_DEFAULT = [
  {
    numPeople: 4,
    numTables: 2,
  },
];

const LocalForm = ({
  localData,
  setLocalData,
  mapData,
  setMapData,
  showMap,
  setShowMap,
  files,
  setFiles,
  menu,
  setMenu,
  isEdit = false,
  handleSave,
}) => {
  const { control, register, watch, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'bookings',
  });

  const watching = useWatch({
    control,
    name: 'bookings',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (fields.length === 0) {
      setValue('bookings', BOOKINGS_DEFAULT);
    }
  }, []);

  useEffect(() => {
    setLocalData({ ...localData, bookings: getValues('bookings') });
  }, [watching]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const getCoordenatesFromAddress = async address => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`
    )
      .then(response => response.json())
      .then(data => {
        setLocalData({
          ...localData,
          coords: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          address: data.results[0].formatted_address,
        });
        setMapData({
          ...mapData,
          center: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        });
      })
      .catch(error => console.log(error));
    setShowMap(true);
  };

  const onCircleInteraction = (childKey, childProps, mouse) => {
    setMapData({
      ...mapData,
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };
  const onCircleInteraction3 = (childKey, childProps, mouse) => {
    setMapData({ ...mapData, draggable: true });
  };

  const handleOnChange = ({ center, zoom }) => {
    setMapData({ ...mapData, center: center, zoom: zoom });
  };

  const handleInvalidBookings = () => {
    let invalid = false;
    const { bookings } = getValues();
    bookings?.forEach(booking => {
      if (
        booking === undefined ||
        booking.numPeople === undefined ||
        booking.numPeople === '' ||
        booking.numTables === undefined ||
        booking.numTables === ''
      ) {
        invalid = true;
      }
    });
    return invalid;
  };

  const handleDelete = async () => {
    await localService.deleteLocal(localData._id)
    navigate("/home")

  };

  const removeRow = index => {
    remove(index);
  };

  const renderData = () => {
    return fields.map((item, index) => {
      return (
        <Tr key={index} h="90px">
          <Td w="45%">
            <NumberController
              key={item.id}
              name={`bookings.${index}.numPeople`}
              control={control}
              decimalScale="2"
              defaultValue={item.numPeople}
              style={{ height: '2rem' }}
              rules={{
                required: 'Field required.',
              }}
            />
          </Td>
          <Td w="45%">
            <NumberController
              key={item.id}
              name={`bookings.${index}.numTables`}
              control={control}
              decimalScale="2"
              defaultValue={item.numTables}
              style={{ height: '2rem' }}
              rules={{
                required: 'Field required.',
              }}
            />
          </Td>
          <Td>
            {fields.length < 2 ? (
              <Box
                data-testid="button_remove"
                _hover={{ cursor: 'not-allowed' }}
              >
                <MinusCircle size={28} weight="thin" color="#ACAEB4" />
              </Box>
            ) : (
              <Box
                data-testid="button_remove"
                _hover={{ cursor: 'pointer' }}
                onClick={() => removeRow(index)}
              >
                <MinusCircle size={28} weight="thin" style={{ color: 'red' }} />
              </Box>
            )}
          </Td>
        </Tr>
      );
    });
  };

  return (
    <Box>
      <Stack direction={['column', 'row']} spacing="20px" mb="30px">
        <Image
          alt={'local foto'}
          src={files[0]?.preview || RestaurantDefault}
          w="200px"
          h="200px"
        />
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(1 files are the maximum number of files you can drop here)</em>
        </div>
      </Stack>
      {files.length > 0 && (
        <HStack mb="30px">
          <Text fontSize="14px" fontWeight="700">
            Accepted files
          </Text>
          <Text fontSize="14px">
            {files[0]?.path} - {files[0]?.size} bytes
          </Text>
        </HStack>
      )}
      <Stack
        direction={['column', 'row']}
        spacing="20px"
        mb="20px"
        alignItems={'center'}
      >
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            value={localData.address}
            onChange={e =>
              setLocalData({ ...localData, address: e.target.value })
            }
            focusBorderColor="brand.primary"
          />
          <FormHelperText>
            Set address before submit to see your local coords.
          </FormHelperText>
        </FormControl>
        <Button
          variant="primary"
          onClick={() => getCoordenatesFromAddress(localData.address)}
        >
          Set Address
        </Button>
      </Stack>
      <Stack direction={['column', 'row']} spacing="20px" mb="20px">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={localData.name}
            onChange={e => setLocalData({ ...localData, name: e.target.value })}
            focusBorderColor="brand.primary"
          />
          <FormHelperText>Name of your local </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <Input
            type="text"
            value={localData.tags}
            onChange={e =>
              setLocalData({
                ...localData,
                tags: e.target.value.split(','),
              })
            }
            focusBorderColor="brand.primary"
          />
          <FormHelperText>
            Split the tags with comma. Example: American,Italian{' '}
          </FormHelperText>
        </FormControl>
      </Stack>
      <HStack spacing="20px" mb="20px">
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={localData.description}
            onChange={e =>
              setLocalData({ ...localData, description: e.target.value })
            }
            placeholder="Description of your local"
            size="md"
            focusBorderColor="brand.primary"
          />
        </FormControl>
      </HStack>
      <Text
        fontSize="16px"
        color="#1a202c"
        fontWeight="400"
        mt="30px"
        mb="20px"
      >
        Menu
      </Text>
      <Stack direction={['column', 'row']} spacing="20px" mb="30px">
        <Image
          alt={'menu foto'}
          src={menu[0]?.preview || MenuDefault}
          w="200px"
          h="200px"
        />
        <Dropzone
          onDrop={acceptedFiles => {
            setMenu(
              acceptedFiles.map(file =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
          }}
          name="menu"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drop menu image here, or click to select file</p>
            </div>
          )}
        </Dropzone>
      </Stack>
      {!isEdit && (
        <Text
          fontSize="16px"
          color="#1a202c"
          fontWeight="400"
          mt="30px"
          mb="20px"
        >
          Tables
        </Text>
      )}

      {!isEdit && (
        <Table variant="subTable" color="#686868" width="100%" mt="15px">
          <Thead>
            <Tr>
              <Th w="45%" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
                {' '}
                Nº people/table
              </Th>
              <Th w="45%" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
                {' '}
                Nº tables
              </Th>
              <Th w="10%" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
                {' '}
              </Th>
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      )}
      {!isEdit && (
        <Flex
          data-testid="button_add"
          alignItems="center"
          m="5px 0px 50px 25px"
          _hover={{ cursor: 'pointer' }}
          onClick={() => append()}
        >
          <Text
            fontSize="14px"
            color="brand.primary"
            fontWeight="400"
            mr="5px"
            textDecoration="underline"
          >
            Add table
          </Text>
          <PlusCircle size={18} style={{ color: 'orange' }} />
        </Flex>
      )}
      {showMap && (
        <Box w="100%" h="600px">
          <GoogleMapReact
            draggable={mapData.draggable}
            onChange={({ zoom, center }) => handleOnChange({ center, zoom })}
            center={mapData.center}
            defaultCenter={{
              lat: 40.3396472,
              lng: -3.7729584,
            }}
            defaultZoom={15}
            zoom={mapData.zoom}
            options={mapStyles}
            bootstrapURLKeys={{ key: apikey, v: '3.31' }}
            onChildMouseDown={({ childKey, childProps, mouse }) =>
              onCircleInteraction(childKey, childProps, mouse)
            }
            onChildMouseUp={(childKey, childProps, mouse) =>
              onCircleInteraction3(childKey, childProps, mouse)
            }
            onChildMouseMove={(childKey, childProps, mouse) =>
              onCircleInteraction(childKey, childProps, mouse)
            }
          >
            <Marker
              key="local"
              lat={mapData.lat}
              lng={mapData.lng}
              name="Local location"
              icon="restaurant"
            />
          </GoogleMapReact>
        </Box>
      )}

      <Box h="15%">
        <Divider color="brand.gray2" />
        <Flex
          p="0px 24px"
          justifyContent="flex-end"
          h="99%"
          alignItems="center"
        >
          <Button
            variant="secondary2"
            mr="20px"
            mt="20px"
            isDisabled={handleInvalidBookings()}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Flex>
      </Box>
      {isEdit && (
        <Box w="full">
          <Heading>Danger Zone</Heading>
          <Flex justifyContent="space-between">
            <Button onClick={handleDelete}>Delete Local</Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default LocalForm;
