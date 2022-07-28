import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Divider, Flex, FormControl, Heading, InputRightElement, Text } from '@chakra-ui/react';
import AuthContext from '../../store/authContext';
import { useNavigate } from 'react-router-dom';
import packageJson from '../../../package.json';
import authService from '../../services/authService';
import InputController from '../../components/Form/InputController';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { isInvalidForm } from '../../utils/validates';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = getValues()

    if (isSignup) {
      authService
      .register(form.email,form.password, form.name)
      .then( (response) => {
        setIsLoading(false);
        if (response.status === 500){
          toast.error(
            response.data,
            { isLoading: false, autoClose: 5000, closeOnClick: true, closeButton: true, hideProgressBar: false }
          );
          return
        }

        authService
      .login(form.email,form.password)
      .then( (response) => {
        setIsLoading(false);
        if (response.status === 401){
          toast.error(
            response.data,
            { isLoading: false, autoClose: 5000, closeOnClick: true, closeButton: true, hideProgressBar: false }
          );
          return
        }
        const {token, expires_in, email} = response?.data?.data;

        const expirationTime = new Date(
          new Date().getTime() + expires_in * 1000
        );

        login(
          email,
          token,
          expirationTime,
          [/* ...roles, */ 'ADMIN'],
          JSON.stringify(response?.data?.data)
        );

        dispatch(userActions.setUser(response?.data?.data));

        navigation('/home');
      });
      });
    } else {
      authService
        .login(form.email,form.password)
        .then( (response) => {
          setIsLoading(false);
          if (response.status === 401){
            toast.error(
              response.data,
              { isLoading: false, autoClose: 5000, closeOnClick: true, closeButton: true, hideProgressBar: false }
            );
            return
          }
          const {token, expires_in, email} = response?.data?.data;

          const expirationTime = new Date(
            new Date().getTime() + expires_in * 1000
          );

          login(
            email,
            token,
            expirationTime,
            [/* ...roles, */ 'ADMIN'],
            JSON.stringify(response?.data?.data)
          );

          dispatch(userActions.setUser(response?.data?.data));

          navigation('/home');
        });
    }
  }; 

  const { 
    control,
    getValues,
    watch
  } = useForm({
    mode:'onChange',
    defaultValues:{
      email: '',
      password: ''
    }
  });

  const handleShowPassword = () =>{
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const handleIsSigningUp = () =>{
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  const handleValidForm = () => {
    const inputsSignup = ['email','password','name'];
    const inputsSignin = ['email','password'];

    const formValues = getValues();

    const isInvalid = isInvalidForm(formValues, isSignup ? inputsSignup : inputsSignin);

    return isInvalid;
  };

  useEffect(() => {
      setIsButtonDisabled(handleValidForm());
  }, [watch('email'), watch('password'),watch('name'), isSignup])
  

  return (
    <Box data-testid='log-in-form' w={ { sm:'100%', md: '50%', xl: '50%' }} >
      <Flex h='100%' direction='column' justifyContent='center'>
        <Box marginX={{base: '20px', md: 'auto'}}>
          <Box mb='30px'>
            <Heading as='h3' mb='10px' fontSize='20' fontWeight='700' color='#696C78'>{"Sign in"}</Heading>
            <Heading data-testid='text_greeting' as='h3' fontSize='28' fontWeight='700'>{"Welcome to"}</Heading>
            <Heading as='h3' mb='20px' fontSize='28' fontWeight='700'>{"Dining Room App"}</Heading>
            <Heading as='h4' p='10px 0 0 0' fontSize='18' fontWeight='500'color='#999999' lineHeight='16px'>{"Your portal to reserve a place in a restaurant"}</Heading>
          </Box>

          <Box mt='50px' marginX={{base: '20px', md: 'auto'}}>
            <form onSubmit={ (e) => handleLogin(e) }>
              <Box w='100%'>
                <InputController 
                  name='email'
                  type='text'
                  control={ control }
                  formStyle={ {
                  mb:'20px'
                  } }
                  label={
                  <Text fontSize='14px' color='brand.gray2' fontWeight='500' mb='10px'>
                      Email
                  </Text>
                  }
                  rules={ {
                  required: 'Email is required.',
                  maxLength: {
                      value: 255,
                      message: 'Too many characters'
                  },
                  } }
                />
                <InputController 
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  control={ control }
                  formStyle={ {
                  mb:'20px'
                  } }
                  label={
                  <Text fontSize='14px' color='brand.gray2' fontWeight='500' mb='10px'>
                      Password
                  </Text>
                  }
                  rules={ {
                  required: 'Password is required.',
                  maxLength: {
                      value: 255,
                      message: 'Too many characters'
                  },
                  } }
                  inputRightElement={
                    <InputRightElement w='' gap='10px' zIndex='1'>
                      <Button data-testid='max-button' mr='5px' border='none' color='#2973B8' variant='seePassword' h='1.75rem' w='58px' size='sm' onClick={ () => handleShowPassword() }>
                        <Divider orientation='vertical' color='#D6D8DD' pr='15px' />
                        {showPassword ? <Eye size={32} color='black' weight="thin" /> : <EyeSlash size={32} color='black' weight="thin" />}
                      </Button>
                    </InputRightElement>
                  }
                />

                { isSignup && <InputController 
                  name='name'
                  type='text'
                  control={ control }
                  formStyle={ {
                  mb:'20px'
                  } }
                  label={
                  <Text fontSize='14px' color='brand.gray2' fontWeight='500' mb='10px'>
                      Name
                  </Text>
                  }
                  rules={ {
                  required: 'Name is required.',
                  maxLength: {
                      value: 255,
                      message: 'Too many characters'
                  },
                  } }
                />}
                <FormControl>
                  <Button  bgColor='brand.primary' w={{base: 'full', md: '370px'}} type='submit' isLoading={ isLoading } isDisabled={ isButtonDisabled }>{isSignup ? "Sign Up" : "Enter"}</Button> 
                </FormControl>
                { isSignup ? <Text display='flex' justifyContent='flex-end' fontSize='14' fontWeight='500' color='brand.gray1' mr='10px'>
                     Already have an account?
                    <Text as='span' fontSize='14' fontWeight='500' color='brand.primary' textDecoration='underline' ml='4px' onClick={() => handleIsSigningUp()}>Sign in</Text> 
                </Text> :
                <Text display='flex' justifyContent='flex-end' fontSize='14' fontWeight='500' color='brand.gray1' mr='10px'>
                    Don't have an account yet?
                    <Text as='span' fontSize='14' fontWeight='500' color='brand.primary' textDecoration='underline' ml='4px' onClick={() => handleIsSigningUp()}>Sign up</Text>
                </Text>
                }
                <Flex position='absolute' bottom='20px' right='20px' color='#5e5e5e' fontSize='12px' alignItems='center'>
                  <Text fontSize='10' fontWeight='500' color='brand.gray3' mr='10px'>v.{packageJson.version}</Text>
                  <Text fontSize='10' fontWeight='500' color='brand.gray3' mr='10px'>
                    © Dining Room
                  </Text>
                </Flex> 
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginForm;
