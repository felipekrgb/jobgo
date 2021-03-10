import { FaSpinner } from 'react-icons/fa';
import { Container } from './style';

function Botao({ children, loading, ...rest }) {
  return (
    <Container loading={loading} type="button" {...rest}>
      {loading ? <FaSpinner color="FFF" size={14} /> : children}
    </Container>
  );
}

export default Botao;
