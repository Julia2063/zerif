import React from 'react';
import { Main } from '../components/HomePage/Main/Main';
import { Body1 } from '../components/HomePage/Body1/Body1';
import { Body2 } from '../components/HomePage/Body2/Body2';
import { Body3 } from '../components/HomePage/Body3/Body3';
import { Form } from '../components/HomePage/Form/Form';
import { HideBody1 } from '../components/HomePage/HideBody1/HideBody1';
import { HideBody2 } from '../components/HomePage/HideBody2/HideBody2';

export const HomePage = () => {
  return (
    <>
      <Main />
      <Body1 />
      <HideBody1/>
      <Body2 />
      <HideBody2/>
      <Body3 />
      <Form />
    </>
  );
};
