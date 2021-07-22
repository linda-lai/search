const match = (attributeValue, queryValue) => {
  if (Array.isArray(attributeValue)) {
    return attributeValue.includes(queryValue);
    // If attribute in JSON record doesn't exist (`undefined`), the input
    // is treated as if `null` was queried
  } else if (attributeValue === undefined && queryValue === null) {
    return true;
  } else {
    return attributeValue === queryValue;
  }
};

const logo = `
                                      &&&&&&&&&&&& %&&&&&&&&&/     
                                        &&&&&&&&&%  %&&&&&&&&       
                                          &&&&&&&   %&&&&&&,        
                                                &% %&&&&%          
                                              &&&% %&&&            
                                              &&&&% %/              
                                            &&&&&&%    &&&&.       
                                          &&&&&&&&%  &&&&&&&&     
                                        &&&&&&&&&&% &&&&&&&&&&   
`;

const padding = (spacing) => " ".repeat(spacing);

const border = (character, multiplier) => character.repeat(multiplier);

module.exports = { match, logo, padding, border };
