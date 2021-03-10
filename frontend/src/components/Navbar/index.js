import { FiPower } from 'react-icons/fi';
import { Container } from './styles';
import Logo from '../Logo';
import { useAuth } from '../../hooks/auth';

function Navbar(props) {
  const { color, colorlogo, scroll, link, desconectar } = props;

  const { signOut } = useAuth();

  return (
    <Container color={color} scroll={scroll}>
      <Logo colorlogo={colorlogo} scroll={scroll} link={link} />
      {desconectar && (
        <button type="button" onClick={signOut}>
          <FiPower size={20} />
        </button>
      )}
    </Container>
  );
}

export default Navbar;
