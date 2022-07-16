import React from 'react';
import Topbar from './Topbar/Topbar';
import { Box, Fade } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = Component => props => {
  const location = useLocation();
  const match = { params: useParams() };
  const history = useNavigate();

  return <Component location={ location } match={ match } history={ history } { ...props } />;
};

const Layout = () => {
  return (
    <Box data-testid='layout'>
      <Fade in={ true }>
        <Topbar />
      </Fade>
    </Box>
  );
};

export default withRouter(Layout);
