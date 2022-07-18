import { List, ListItem } from '@chakra-ui/react';
import React from 'react';
import Card from './Card';

const ScrollList = ({ listItems, filter = '', handleSelectSite }) => {
  return (
    <List h="100%" overflowY={'scroll'}>
      {listItems
        .filter(
          site =>
            site.properties.name.toLowerCase().includes(filter.toLowerCase()) ||
            site.properties.address.toLowerCase().includes(filter.toLowerCase())
        )
        .map(site => (
          <ListItem key={site.properties.id}>
            <Card
              siteData={site.properties}
              handleSelectSite={handleSelectSite}
              canClose={false}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default ScrollList;
