import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import arrayShuffle from 'array-shuffle';

import { useAuth } from '../../hooks/auth';

import FotoEmpresaPadrao from '../../assets/empresa-padrao.png';

import { ContainerConteudo } from './styles';

import LayoutPadrao from '../../components/LayoutPadrao';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

function Vagas() {
  const location = useLocation();
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [pagina, setPagina] = useState(location.pagina || 1);
  const [vagas, setVagas] = useState(location.vagas || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getVagas() {
      try {
        const response = await api.get('/vaga');
        const responseVagas = response.data.vagas;

        const vagasFiltradas = [];
        for (let i = 0; i < responseVagas.length; i += 1) {
          let inserir = true;
          for (let j = 0; j < user.candidaturas.length; j += 1) {
            if (responseVagas[i]._id === user.candidaturas[j]._id) {
              inserir = false;
              break;
            }
          }
          if (inserir) {
            vagasFiltradas.push(responseVagas[i]);
          }
        }

        if (vagasFiltradas.length === 0) {
          setLoading(false);
          history.push('/home');

          addToast({
            type: 'error',
            title: 'Nenhuma vaga foi encontrada',
          });

          return;
        }

        setVagas(arrayShuffle(vagasFiltradas));
        setLoading(false);
      } catch (err) {
        history.push('/home');

        addToast({
          type: 'error',
          title: 'Nenhuma vaga foi encontrada',
        });
      }
    }

    if (location.vagas) {
      setLoading(false);
      return;
    }
    getVagas();
  }, [addToast, history, location.vagas, user.candidaturas]);

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
                  <button type="button" onClick={() => setPagina(pagina - 8)}>
                    <IoIosArrowBack size={24} />
                  </button>
                )}
              </div>
              <div>
                {Math.ceil(pagina / 8) !== Math.ceil(vagas.length / 8) && (
                  <button type="button" onClick={() => setPagina(pagina + 8)}>
                    <IoIosArrowForward size={24} />
                  </button>
                )}
              </div>
            </div>
            <section>
              {vagas
                .filter(
                  (vaga, indice) =>
                    indice + 1 >= pagina && indice + 1 <= pagina + 7,
                )
                .map(vaga => (
                  <Link
                    to={{
                      pathname: `/vaga/${vaga._id}`,
                      pagina,
                      vagas,
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
                    <h2>{vaga.empresa.nome}</h2>
                    <h1>{vaga.titulo}</h1>
                    <div>
                      <p>{vaga.tipo}</p>
                      <p>{`${vaga.periodoInicio} - ${vaga.periodoFim}`}</p>
                    </div>
                  </Link>
                ))}
            </section>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Vagas;
