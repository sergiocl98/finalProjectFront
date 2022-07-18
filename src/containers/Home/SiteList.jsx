import React, { useState } from 'react';
import Tarjeta from './Tarjeta';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
} from '@chakra-ui/react';

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
          siteData={siteList.find(site => site.properties.id === selectedSite)}
          handleSelectSite={handleSelectSite}
        />
      ) : (
        <>
          <InputGroup>
            {inputValue !== '' && (
              <InputRightElement
                onClick={handleInputReset}
                children={<span>X</span>}
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
              .map(site => (
                <ListItem>
                  <Tarjeta
                    key={site.properties.id}
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
