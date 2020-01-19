import React from 'react';
import { useMessages } from '../../context/MessageProvider';

export const Message = () => {
  const { message } = useMessages();

  return <h5 className="mb-8">{message || 'Place a counter'}</h5>;
};
