import { Container, Corpo, ContainerPerfil } from './styles';

import Navbar from '../Navbar';
import Perfil from '../Perfil';

function LayoutPadrao({ children }) {
  return (
    <>
      <Navbar color="#007bff" colorlogo="#fff" desconectar />
      <Container>
        <Corpo>
          <ContainerPerfil>
            <Perfil />
          </ContainerPerfil>
          {children}
        </Corpo>
      </Container>
    </>
  );
}

export default LayoutPadrao;
