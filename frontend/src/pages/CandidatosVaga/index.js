import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LayoutPadrao from '../../components/LayoutPadrao';

import FotoPadrao from '../../assets/foto-padrao.png';

import { ContainerConteudo } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

function CandidatosVagas() {
  const [vaga, setVaga] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const [pagina, setPagina] = useState(location.pagina || 1);

  useEffect(() => {
    const getVaga = async () => {
      try {
        const response = await api.get(`/vaga/${id}`);
        const responseVaga = { ...response.data.vaga };
        setVaga({ ...responseVaga });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        history.push('/');

        addToast({
          type: 'error',
          title: 'Erro ao candidatar-se para a vaga',
          description:
            'Ocorreu um erro ao candidatar-se para a vaga, tente novamente',
        });
      }
    };

    getVaga();
  }, [addToast, history, id]);

  return (
    <LayoutPadrao>
      <ContainerConteudo loading={loading ? 1 : 0}>
        {loading ? (
          <FaSpinner color="#007bff" size={64} />
        ) : (
          <>
            <div className="menu">
              <div className="voltar">
                <button
                  type="button"
                  onClick={() =>
                    history.push({
                      pathname: `/candidatos/vagas`,
                      pagina: location.paginaVagas,
                    })
                  }
                >
                  <IoIosArrowBack size={24} />
                  Voltar
                </button>
              </div>
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
                    Math.ceil(vaga.candidatos.length / 5) && (
                    <button type="button" onClick={() => setPagina(pagina + 5)}>
                      <IoIosArrowForward size={24} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <section>
              {vaga.candidatos
                .filter(
                  (candidato, indice) =>
                    indice + 1 >= pagina && indice + 1 <= pagina + 4,
                )
                .map(candidato => (
                  <Link
                    to={{
                      pathname: `/candidato/${candidato._id}`,
                      pagina,
                      id,
                    }}
                    key={candidato._id}
                  >
                    <img
                      src={candidato.foto ? candidato.foto.url : FotoPadrao}
                      alt={vaga.empresa.foto ? vaga.titulo : 'Foto padrão'}
                    />
                    <div>
                      <strong>{candidato.nome}</strong>
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
