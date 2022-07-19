import { Button, Divider, Flex, FormControl, FormErrorMessage, InputGroup, InputRightAddon, InputRightElement, Stack } from '@chakra-ui/react';
import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import './NumberController.css';

const NumberController = ({ 
  control, 
  name, 
  id, 
  label = '', 
  rules, 
  placeholder,
  onChangeAux, 
  onBlurAux, 
  maxValue,
  minValue,
  allowNegative = false,
  suffix,
  disabled,
  decimalSeparator,
  thousandSeparator,
  hasArrows=false,
  maxButton=false,
  rigthAddon=false,
  showErrors=true,
  'data-testid': dataTestId,
  formStyle,
  handleAllowedCustom,
  readOnly,
  decimalScale,
  decimalPrecision,
  ...props 
}) => {

  const [ inputFloatValue, setInputFloatValue ] = useState();
  
  return (
    <Controller
      control={ control }
      rules={ rules }
      name={ name }
      render={ ({
        field: { onChange, onBlur, value },
        fieldState: { invalid, error },
      }) => {
        const onChangeCustom = (values) => {
          onChange(values.floatValue === undefined ? '' : values.floatValue);
          setInputFloatValue(values.floatValue);
          onChangeAux && onChangeAux(values, values.value, values.isMax !== undefined ? values.isMax : false);
        };
        
        const onBlurCustom = (event) => {
          onBlur(event);

          onBlurAux && onBlurAux(inputFloatValue);
        };

        const addMaxValue = () => {
          if (maxValue) {
            onChangeCustom({value: maxValue.toString(), floatValue: maxValue, isMax: true});
            onBlurAux && onBlurAux(maxValue);
          }
        };

        const handleAllowed = (inputObj) => {
          if (maxValue == 0) return false;

          if (maxValue && minValue){
            const { floatValue } = inputObj;
            let floatAux = floatValue;

            if (floatValue === undefined) floatAux = minValue;

            if (minValue <= floatAux && floatAux <= maxValue ) return true;
            return false;
          }

          if (maxValue) {
            const { floatValue } = inputObj;
            let floatAux = floatValue;
            if (!floatValue) floatAux = 0;
            if (floatAux <= maxValue ) return true;
            return false;
          }

          if (minValue) {
            const { floatValue } = inputObj;
            let floatAux = floatValue;
            if (!floatValue) floatAux = minValue;
            if (floatAux >= minValue ) return true;
            return false;
          }
          return true;
        };

        const incrementValue = () => {
          if (maxValue) {
            maxValue !== value && onChangeCustom({value: !value ? 1 : value++, floatValue: !value ? '1' : value++ });
          } else {
            onChangeCustom({value: !value ? 1 : value++, floatValue: !value ? '1' : value++ });
          }
        };

        const decrementValue = () => {
          if (minValue || minValue === 0) {
            minValue !== value && onChangeCustom({value: !value ? minValue : value--, floatValue: !value ? minValue : value-- });
          } else {
            onChangeCustom({value: !value ? 0 : value--, floatValue: !value ? '0' : value-- });
          }
        };
        
        return (
          <Stack
            w='full'
          >
            <FormControl data-testid='formControl' isInvalid={ invalid } id={ id } { ...formStyle }>
              {label}
              <InputGroup>
                <NumberFormat
                  data-testid={ dataTestId || name }
                  suffix={ suffix }
                  value={ value }
                  displayType='input'
                  type='text'
                  thousandSeparator={ thousandSeparator || '.' }
                  decimalSeparator={ decimalPrecision=== 0 ? false : decimalSeparator || ',' }
                  placeholder={ placeholder }
                  className={ invalid ? 'no-valid' : readOnly ? 'read-only' : 'number-input' }
                  onValueChange={ (values, e) => onChangeCustom(values, e) }
                  onBlur={ (e) => onBlurCustom(e) }
                  isAllowed={ handleAllowedCustom || handleAllowed }
                  allowNegative={ allowNegative }
                  disabled={ disabled }
                  decimalScale={ decimalScale || 2 }
                  { ...props }
                />
                
                <InputRightElement w='' gap='10px' zIndex='1'>
                  { maxButton && 
                    <Button data-testid='max-button' mr='5px' border='none' color='#2973B8' variant='seePassword' h='1.75rem' w='58px' size='sm' onClick={ (e) => addMaxValue(e) }>
                      <Divider orientation='vertical' color='#D6D8DD' pr='15px' />
                      MAX
                    </Button>
                  }
                  { rigthAddon && <InputRightAddon h='36.8px' mr='1px' children='€'/>}
                  { hasArrows && 
                    <Flex>
                      <Button borderRadius='0px' w='20px' onClick={ () => incrementValue() }> 
                        <CaretUp size={ 24 } weight="fill" />
                      </Button>
                      <Button borderRadius='0px' borderTopRightRadius='5px' borderBottomRightRadius='5px' w='20px' onClick={ (e) => decrementValue(e) }>
                        <CaretDown size={ 24 } weight="fill" />
                      </Button>
                    </Flex>
                  }
                </InputRightElement>
                
              </InputGroup>
              {showErrors &&
                <FormErrorMessage position='absolute' whiteSpace='nowrap'>{error && error.message}</FormErrorMessage>
              }
            </FormControl>
          </Stack>
          );
      } }
    />
  );
};

export default NumberController;