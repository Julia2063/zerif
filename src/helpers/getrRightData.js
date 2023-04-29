export const getRightData = (item, language, key) => {
  switch (language) {
  case 'en': 
    return item?.en[key];

  case 'en-US': 
    return item?.en[key];
  
  case 'ru': 
    
    return item?.ru[key];

  case 'ru-RU': 
    return item?.ru[key];
  
  case 'az': 
    return item?.az[key];

  case 'az-AZ': 
    return item?.az[key];
  
  default: 
    return;
  }
};