import React from 'react';
import { Box,  Flex, IconButton, Spacer, Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const HeaderPage = ({ 
  title, 
  description, 
  hasGoBack,
  urlBack
}) => {
  const navigate = useNavigate();
  const handleGo = (url) => {
    navigate(url);
  };


  return (
    <Flex h="50px" data-testid='header_container' justifyContent='space-between' alignItems='center'
    >
      <Box>
        <Box color='brand.primary' textStyle='h3' fontSize='20px'> { title } </Box>
        <Box color='brand.gray3' fontSize='14px'> { description } </Box>
      </Box>
      <Spacer/>
      {hasGoBack && 
        <Tooltip hasArrow label='Go back'>
          <IconButton 
            data-testid='button_go_back' 
            fontSize='14px'
            bgColor='white'
            mr='0px'
            icon={ <ArrowLeft size={32} color="black" weight="thin" /> }
            onClick={ () => handleGo(urlBack || -1) }
          >
          </IconButton>
        </Tooltip>
      }
    </Flex>
  );
};

export default HeaderPage;