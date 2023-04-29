export const getRightData = (item, language, key) => {
  switch (language) {
  case 'en' || 'en-US': 
    return item?.en[key];
  
  case 'ru' || 'ru-RU': 
    return item?.ru[key];
  
  case 'az' || 'az-AZ': 
    return item?.az[key];
  
  default: 
    return;
  }
};