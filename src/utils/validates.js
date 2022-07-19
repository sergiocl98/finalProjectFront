export const isInvalidForm = (formValues, inputs) => {
  if (Object.keys(formValues).length === 0) return true;

  let isInvalid = false;

  Object.keys(formValues).forEach((key)=>{
    if (inputs.includes(key) && (formValues[key] === undefined || formValues[key] === '')){
      isInvalid = true;
    }
  });
  
  return isInvalid;
};
