import React, { useState } from 'react';
import Card from './Card';
import {
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

const SiteList = () => {
  const siteList = useSelector(state => state.maps.siteList);
  const visibleSiteList = useSelector(state => state.maps.visibleSiteList);
  const selectedSite = useSelector(state => state.maps.selectedSite);

  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const handleInputReset = e => {
    setInputValue('');
  };

  const handleSelectSite = (id = undefined) => {
    dispatch(setSelectedSite(id));
    setInputValue('');
  };

  return (
    <Box h="100%">
      {selectedSite !== undefined ? (
        <Card
          id={selectedSite}
          siteData={siteList.find(site => site.properties.id === selectedSite)}
          handleSelectSite={handleSelectSite}
        />
      ) : (
        <>
          <InputGroup>
            <InputLeftElement
              pointerEvents={'none'}
              children={<MagnifyingGlass size={24} />}
            ></InputLeftElement>
            {inputValue !== '' && (
              <InputRightElement
                onClick={handleInputReset}
                children={<X size={24} />}
              ></InputRightElement>
            )}
            <Input
              placeholder="Search for a place"
              value={inputValue}
              onInput={handleInput}
            ></Input>
          </InputGroup>

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
  );
};

export default SiteList;
