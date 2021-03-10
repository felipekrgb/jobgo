import { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';

import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [mensagens, setMensagens] = useState([]);

  const addToast = useCallback(
    ({ type, title, description }) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMensagens([...mensagens, toast]);
    },
    [mensagens],
  );

  const removeToast = useCallback(id => {
    setMensagens(state => state.filter(mensagem => mensagem.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer mensagens={mensagens} />
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast precisa ser utilizado com um ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
