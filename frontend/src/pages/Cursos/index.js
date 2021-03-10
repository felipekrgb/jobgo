import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import arrayShuffle from 'array-shuffle';

import FotoEmpresaPadrao from '../../assets/empresa-padrao.png';

import { ContainerConteudo } from './styles';

import LayoutPadrao from '../../components/LayoutPadrao';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

function Cursos() {
  const location = useLocation();
  const { addToast } = useToast();
  const history = useHistory();
  const [pagina, setPagina] = useState(location.pagina || 1);
  const [cursos, setCursos] = useState(location.cursos || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCursos() {
      try {
        const response = await api.get('/curso');
        const responseCursos = response.data.cursos;

        if (responseCursos.length === 0) {
          setLoading(false);
          history.push('/home');

          addToast({
            type: 'error',
            title: 'Nenhum curso foi encontrado',
          });

          return;
        }

        setCursos(arrayShuffle(responseCursos));
        setLoading(false);
      } catch (err) {
        history.push('/home');

        addToast({
          type: 'error',
          title: 'Nenhum curso foi encontrado',
        });
      }
    }

    if (location.cursos) {
      setLoading(false);
      return;
    }

    getCursos();
  }, [addToast, history, location.cursos]);

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
                {Math.ceil(pagina / 8) !== Math.ceil(cursos.length / 8) && (
                  <button type="button" onClick={() => setPagina(pagina + 8)}>
                    <IoIosArrowForward size={24} />
                  </button>
                )}
              </div>
            </div>
            <section>
              {cursos
                .filter(
                  (curso, indice) =>
                    indice + 1 >= pagina && indice + 1 <= pagina + 7,
                )
                .map(curso => (
                  <Link
                    to={{
                      pathname: `/curso/${curso._id}`,
                      pagina,
                      cursos,
                    }}
                    key={curso._id}
                  >
                    <img
                      src={
                        curso.escola.foto
                          ? curso.escola.foto.url
                          : FotoEmpresaPadrao
                      }
                      alt={curso.escola.foto ? curso.titulo : 'Foto padrão'}
                    />
                    <h2>{curso.escola.nome}</h2>
                    <h1>{curso.titulo}</h1>
                  </Link>
                ))}
            </section>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Cursos;
