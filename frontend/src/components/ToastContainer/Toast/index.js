import { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';

import { useToast } from '../../../hooks/toast';

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  sucess: <FiCheckCircle size={24} />,
};

function Toast({ mensagem, style }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(mensagem.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, mensagem.id]);

  return (
    <Container
      type={mensagem.type}
      description={mensagem.description ? 1 : 0}
      style={style}
    >
      {icons[mensagem.type || 'info']}

      <div>
        <strong>{mensagem.title}</strong>
        {mensagem.description && <p>{mensagem.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(mensagem.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

export default Toast;
