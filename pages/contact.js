import React from 'react';
import ContactForm from '../forms/contact';

import hoc from '../utils/hoc';

const Contact = () => {
  const submit = (values) => {
    console.log(values);
  };
  return <ContactForm onSubmit={submit} />;
};

export default hoc([], null, null)(Contact);
