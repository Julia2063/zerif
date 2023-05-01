export const getRightData = (item, language, key) => {
  switch (language.split('-')[0]) {
  case 'en': 
    return item?.en[key];
  
  case 'ru': 
    return item?.ru[key];
  
  case 'az': 
    return item?.az[key];
  
  default: 
    return;
  }
};