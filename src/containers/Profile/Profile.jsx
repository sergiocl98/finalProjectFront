import { Box, Fade, Grid, Tab, Tabs, TabList, TabPanel, TabPanels, Text } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import ProfileTabOne from './ProfileTabOne';
import { useForm } from 'react-hook-form';
import ProfileTabTwo from './ProfileTabTwo';

const Profile = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const [maxTabIndex, setMaxTabIndex] = useState(0);
    const [optionsTabs, setOptionsTabs] = useState([
    {
      idx: 0,
      number: '01',
      title: 'General information',
    },
    {
      idx: 1,
      number: '02',
      title: 'Manage your local',
    },
  ]);

  useEffect(()=>{
    if (maxTabIndex < tabIndex) setMaxTabIndex(tabIndex);
  },[tabIndex]);

  const { 
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode:'onChange',
    defaultValues:{}
  });

  return (
    <Box h='calc(100vh - 130px)'>
      <Fade in={ true } style={ { height:'100%'} }>
        <HeaderPage
          title={ "My profile" } 
          description={ "Interact with your data profile" }
          hasGoBack 
          urlBack={ '/home' }
        />
      
        <Grid templateColumns='auto' gap='2%' h='calc(100% - 25px)'>
          <Box bgColor='white' minH='100%' h='100%'>
            <Tabs isFitted  isLazy variant='information' index={ tabIndex } onChange={ (index) => setTabIndex(index) } position='relative' h='100%'>
              <TabList justifyContent='space-between'>
                {
                  optionsTabs.map((option, index) => {
                    return (
                      <Tab key={ index } p='15px'  _hover={ { cursor: 'pointer' } }>
                        <Text fontSize='16px' color={ tabIndex === option.idx ? 'brand.primary' : 'brand.gray2' } mr='10px'>
                          { option.number }
                        </Text>
                        <Text fontSize='12px' color='brand.gray2'>
                          { option.title }
                        </Text>
                      </Tab>
                    );
                  })
                }
              </TabList>

              <TabPanels h='calc(100% - 65px)'>
                <TabPanel h='100%' p='0px'>
                  <ProfileTabOne
                    control={ control }
                    setValue= { setValue }
                    getValues= { getValues }
                    watch= { watch }
                    errors= { errors }
                    index={ tabIndex }
                    setIndex={ setTabIndex }
                    optionsTabs={ optionsTabs }
                    setOptionsTabs={ setOptionsTabs }
                  />
                </TabPanel>
                <TabPanel h='100%' p='0px'>
                  <ProfileTabTwo
                    control={ control }
                    setValue= { setValue }
                    getValues= { getValues }
                    watch= { watch }
                    errors= { errors }
                    index={ tabIndex }
                    setIndex={ setTabIndex }
                    optionsTabs={ optionsTabs }
                    setOptionsTabs={ setOptionsTabs }
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Grid>
      </Fade>
    </Box>
  );
};

export default Profile