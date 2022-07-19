import React, { useState } from 'react';
import Card from './Card';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { MagnifyingGlass, X } from 'phosphor-react';
import ScrollList from './ScrollList';

const SiteList = ({
  siteList,
  visibleSiteList,
  selectedSite,
  setSelectedSite,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const handleInputReset = e => {
    setInputValue('');
  };

  const handleSelectSite = (id = undefined) => {
    setSelectedSite(id);
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
