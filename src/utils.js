const match = (attributeValue, queryValue) => {
  if (Array.isArray(attributeValue)) {
    return attributeValue.includes(queryValue);
    // If attribute in JSON record is undefined and user queryValue is null
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

const wordWrap = (text, limit) => {
  if (text.length > limit) {
    const lineBreakIndex = text.slice(0, limit).lastIndexOf(" ");
    if (lineBreakIndex > 0) {
      const line = text.slice(0, lineBreakIndex);
      const remainder = text.slice(lineBreakIndex + 1);
      return line + "\n" + wordWrap(remainder, limit);
    }
  }
  return text;
};

module.exports = { match, wordWrap, logo };
