import React, { useEffect, useState } from 'react';
import Tarjeta from './Tarjeta';
import { Input, List, ListItem } from '@chakra-ui/react';



const SiteList = ({ siteList, selectedSite, setSelectedSite }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  };
  

  return (
    <>
      {selectedSite !== undefined ? (
        <Tarjeta id={selectedSite} setSelectedSite={setSelectedSite} />
      ) : (
        <>
          <Input
            placeholder="Search for a place"
            value={inputValue}
            onInput={handleInput}
          ></Input>
          <List h="100%" overflowY={'scroll'}>
            {siteList
              .filter(site =>
                site.name.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map(site => (
                <ListItem>
                  <Tarjeta
                    key={site.id}
                    id={site.id}
                    setSelectedSite={setSelectedSite}
                    canClose={false}
                  />
                </ListItem>
              ))}
          </List>
        </>
      )}
    </>
  );
};

export default SiteList;
