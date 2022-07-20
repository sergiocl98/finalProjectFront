import React, { useState } from 'react';
import Card from './Card';
import {
  Heading,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { MagnifyingGlass, X } from 'phosphor-react';
import ScrollList from './ScrollList';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSite } from '../../../store/slices/mapsSlice';
import InputController from '../../../components/Form/InputController';
import { useForm } from 'react-hook-form';

const SiteList = () => {
  const { siteList, visibleSiteList, selectedSite, userPermission } =
    useSelector(state => state.maps);

  const { control, setValue, watch } = useForm();

  const dispatch = useDispatch();

  const handleInputReset = () => {
    setValue('inputValue', '');
  };

  const handleSelectSite = (id = undefined) => {
    dispatch(setSelectedSite(id));
  };

  const inputValue = watch('inputValue');

  return (
    <>
      <Box h="100%">
        <Heading>Near Locals</Heading>
        {selectedSite !== undefined ? (
          <Card
            id={selectedSite}
            siteData={siteList.find(
              site => site.properties._id === selectedSite
            )}
            handleSelectSite={handleSelectSite}
          />
        ) : (
          <>
            <InputController
              name="inputValue"
              type="text"
              control={control}
              placeholder="Search for a place"
              inputLeftElement={
                <InputLeftElement
                  pointerEvents={'none'}
                  children={<MagnifyingGlass size={24} />}
                ></InputLeftElement>
              }
              inputRightElement={
                inputValue !== '' && (
                  <InputRightElement
                    onClick={handleInputReset}
                    children={<X size={24} />}
                  ></InputRightElement>
                )
              }
            ></InputController>

            {inputValue !== '' ? (
              <ScrollList
                listItems={siteList}
                filter={inputValue}
                handleSelectSite={handleSelectSite}
              />
            ) : (
              <ScrollList
                listItems={visibleSiteList}
                handleSelectSite={handleSelectSite}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default SiteList;
