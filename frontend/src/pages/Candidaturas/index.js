import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LayoutPadrao from '../../components/LayoutPadrao';

import FotoEmpresaPadrao from '../../assets/empresa-padrao.png';

import { ContainerConteudo } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

function Candidaturas() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const [pagina, setPagina] = useState(location.pagina || 1);

  useEffect(() => {
    if (user.candidaturas.length === 0) {
      history.push('/home');

      addToast({
        type: 'error',
        title: 'Nenhuma candidatura encontrada',
      });
    }
  }, [addToast, history, user.candidaturas.length]);

  return (
    <LayoutPadrao>
      <ContainerConteudo>
        <div className="paginacao">
          <div>
            {pagina !== 1 && (
              <button type="button" onClick={() => setPagina(pagina - 5)}>
                <IoIosArrowBack size={24} />
              </button>
            )}
          </div>
          <div>
            {Math.ceil(pagina / 5) !==
              Math.ceil(user.candidaturas.length / 5) && (
              <button type="button" onClick={() => setPagina(pagina + 5)}>
                <IoIosArrowForward size={24} />
              </button>
            )}
          </div>
        </div>
        <section>
          {user.candidaturas
            .filter(
              (vaga, indice) =>
                indice + 1 >= pagina && indice + 1 <= pagina + 4,
            )
            .map(vaga => (
              <Link
                to={{
                  pathname: `/vaga/${vaga._id}`,
                  pagina,
                }}
                key={vaga._id}
              >
                <img
                  src={
                    vaga.empresa.foto
                      ? vaga.empresa.foto.url
                      : FotoEmpresaPadrao
                  }
                  alt={vaga.empresa.foto ? vaga.titulo : 'Foto padrão'}
                />
                <div>
                  <strong>{`${vaga.titulo} | ${vaga.tipo}`}</strong>
                  <p>{vaga.empresa.nome}</p>
                </div>
                <FiChevronRight size={20} />
              </Link>
            ))}
        </section>
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Candidaturas;
