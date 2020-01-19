import React, { createContext, useContext, useState } from 'react';

type MessageState = {
  message: string;
  setMessage: (message: string, timeout?: number) => void;
};

const MessageContext = createContext<MessageState>({} as MessageState);

export const useMessages = () => useContext(MessageContext);

export const MessageProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string>('');

  const state: MessageState = {
    message,
    setMessage: (message: string, timeout: number = 3000) => {
      setMessage(message);
      setTimeout(() => setMessage(''), timeout);
    }
  };

  return (
    <MessageContext.Provider value={state}>{children}</MessageContext.Provider>
  );
};
