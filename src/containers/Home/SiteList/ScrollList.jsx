import { List, ListItem } from '@chakra-ui/react';
import React from 'react';
import Card from './Card';

const ScrollList = ({ listItems, filter = '', handleSelectSite, isSearch, handleInputReset }) => {
  return (
    <List h="100%" overflowY={'auto'}>
      {listItems
        .filter(
          site =>
            site.properties.name.toLowerCase().includes(filter.toLowerCase()) ||
            site.properties.address.toLowerCase().includes(filter.toLowerCase())
        )
        .map(site => {
          return (
            <ListItem key={site.properties._id}>
              <Card
                siteData={site}
                handleSelectSite={handleSelectSite}
                canClose={false}
                isSearch={isSearch}
                handleInputReset={handleInputReset}
              />
            </ListItem>
          );
        })}
    </List>
  );
};

export default ScrollList;
