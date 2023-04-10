import React from 'react';

import { PopularHeader } from '../components/Popular/PopularHeader/PopularHeader';
import { PopularBlock1 } from '../components/Popular/PopularBlock1/PopularBlock1';
import { PopularBlock2 } from '../components/Popular/PopularBlock2/PopularBlock2';
import { PopularBlock3 } from '../components/Popular/PopularBlock3/PopularBlock3';

export const PopularPage = () => {
  return (
    <>
      <PopularHeader />
      <PopularBlock1 />
      <PopularBlock2 />
      <PopularBlock3 />
    </>
  );
};
