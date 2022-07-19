import { FormControl, FormErrorMessage, Stack } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { SELECT_CONTROLLER_STYLE_DEFAULT } from './SelectControllerStyle';

const SelectController = ({
  id,
  name,
  rules,
  label = '',
  placeholder,
  options,
  control,
  disabled = false,
  onChangeAux,
  onBlurAux,
  showErrors = true,
  chakraStyles,
  formStyle,
  'data-testid': dataTestId,
  ...props
}) => {
  return (
    <Controller 
      control={ control }
      name={ name }
      rules={ rules }
      render={ ({ 
        field: { onChange, value },
        fieldState: { invalid, error}
      }) => {
        const onChangeCustom = (event) => {
          onChange(event);
          onChangeAux && onChangeAux(event);
        };

        const onBlurCustom = (event) => {
          onBlurAux && onBlurAux(event);
        };

        return (
          <Stack w='full'>
            <FormControl data-testid='form_control' isInvalid={ invalid } { ...formStyle }>
              {label}
              <Select 
                data-testid={ dataTestId || name }
                id={ id || name }
                name={ name }
                placeholder={ placeholder || '' }
                value={ value }
                options={ options }
                disabled={ disabled }
                onChange={ onChangeCustom }
                onBlur={ onBlurCustom }
                styles={ chakraStyles || SELECT_CONTROLLER_STYLE_DEFAULT }
                { ...props }
              />
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

export default SelectController;