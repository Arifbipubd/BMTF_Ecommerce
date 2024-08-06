import React, { createContext, useState, useContext } from 'react';

const initialFormData= {
  fName: '',
  lName: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  agree: '',
};

const FormDataContext = createContext(undefined);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
