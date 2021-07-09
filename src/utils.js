const match = (attributeValue, queryValue) => {
  const parsedQueryValue = JSON.parse(queryValue);

  if (Array.isArray(attributeValue)) {
    return attributeValue.includes(parsedQueryValue);
    // if attribute in JSON record is undefined AND query value is `null` or `""`
  } else if (
    (attributeValue === undefined && parsedQueryValue === null) ||
    (attributeValue === undefined && parsedQueryValue === "")
  ) {
    return true;
  } else {
    return attributeValue === parsedQueryValue;
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
