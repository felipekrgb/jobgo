import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import LayoutPadrao from '../../components/LayoutPadrao';

import { ContainerConteudo } from './styles';
import { useToast } from '../../hooks/toast';

function CandidatosVagas() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const [pagina, setPagina] = useState(location.pagina || 1);

  useEffect(() => {
    const vagasCandidatos = user.vagas.filter(
      vaga => vaga.candidatos.length !== 0,
    );

    const quantidadeCandidatos = vagasCandidatos.reduce(
      (total, vaga) => total + vaga.candidatos.length,
      0,
    );

    if (quantidadeCandidatos === 0) {
      history.push('/home');

      addToast({
        type: 'error',
        title: 'Nenhum candidato encontrado',
      });
    }

    setVagas(vagasCandidatos);
    setLoading(false);
  }, [addToast, history, user.vagas]);

  useEffect(() => {
    if (user.vagas.length === 0) {
      history.push('/home');

      addToast({
        type: 'error',
        title: 'Nenhuma vaga encontrada',
      });
    }
  }, [addToast, history, user.vagas.length]);

  return (
    <LayoutPadrao>
      <ContainerConteudo loading={loading ? 1 : 0}>
        {loading ? (
          <FaSpinner color="#007bff" size={64} />
        ) : (
          <>
            <div className="paginacao">
              <div>
                {pagina !== 1 && (
                  <button type="button" onClick={() => setPagina(pagina - 5)}>
                    <IoIosArrowBack size={24} />
                  </button>
                )}
              </div>
              <div>
                {Math.ceil(pagina / 5) !== Math.ceil(vagas.length / 5) && (
                  <button type="button" onClick={() => setPagina(pagina + 5)}>
                    <IoIosArrowForward size={24} />
                  </button>
                )}
              </div>
            </div>
            <section>
              {vagas
                .filter(
                  (vaga, indice) =>
                    indice + 4 >= pagina && indice + 1 <= pagina + 4,
                )
                .map(vaga => (
                  <Link
                    to={{
                      pathname: `/candidatos/vaga/${vaga._id}`,
                      paginaVagas: pagina,
                    }}
                    key={vaga._id}
                  >
                    <div>
                      <strong>{vaga.titulo}</strong>
                      <p>{vaga.tipo}</p>
                    </div>
                    <FiChevronRight size={20} />
                  </Link>
                ))}
            </section>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default CandidatosVagas;
