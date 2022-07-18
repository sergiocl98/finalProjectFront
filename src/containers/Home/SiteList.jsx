import React, { useState } from 'react';
import Tarjeta from './Tarjeta';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
} from '@chakra-ui/react';
import { MagnifyingGlass, X } from 'phosphor-react';

const SiteList = ({ siteList, selectedSite, setSelectedSite }) => {
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
        <Tarjeta
          id={selectedSite}
          siteData={
            siteList.find(site => site.properties.id === selectedSite)
              .properties
          }
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
          <List h="100%" overflowY={'scroll'}>
            {siteList
              .filter(
                site =>
                  site.properties.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  site.properties.address
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
              )
              .sort((a, b) => {
                return a.properties.distToUser - b.properties.distToUser;
              })
              .slice(0, 50)
              .map(site => (
                <ListItem key={site.properties.id}>
                  <Tarjeta
                    siteData={site.properties}
                    handleSelectSite={handleSelectSite}
                    canClose={false}
                  />
                </ListItem>
              ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default SiteList;
