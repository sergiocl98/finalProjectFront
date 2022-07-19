import { FormControl, FormErrorMessage, Input, InputGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputController = ({
  id,
  name,
  rules,
  label = '',
  placeholder,
  control,
  disabled = false,
  onChangeAux,
  onBlurAux,
  showErrors = true,
  inputLeftElement,
  inputRightElement,
  formStyle,
  autoComplete,
  ...props
}) => {
  return (
    <Controller 
      control={ control }
      name={ name }
      rules={ rules }
      render={ ({
        field: { onChange, value },
        fieldState: { invalid, error }
      }) => {
        const onChangeCustom = (event) => {
          onChange(event);
          onChangeAux && onChangeAux(event);
        };

        const onBlurCustom = (event) => {
          onBlurAux && onBlurAux(event);
        };

        return (
          <Stack
            w='full'
          >
            <FormControl isInvalid={ invalid } { ...formStyle }>
              {label}
              <InputGroup>
                {inputLeftElement}
                <Input 
                  id={ id || name }
                  name={ name }
                  placeholder={ placeholder }
                  value={ value || '' }
                  disabled={ disabled }
                  onChange={ onChangeCustom }
                  onBlur={ onBlurCustom }
                  autoComplete={ autoComplete || 'off' }
                  { ...props }
                />
                {inputRightElement}
              </InputGroup>
              {showErrors &&
                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              }
            </FormControl>
          </Stack>
        );
      } }
    />
  );
};

export default InputController;