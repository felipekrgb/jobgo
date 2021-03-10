import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import LayoutPadrao from '../../components/LayoutPadrao';

import { ContainerConteudo } from './styles';
import { useToast } from '../../hooks/toast';

function EditarCursos() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const [pagina, setPagina] = useState(location.pagina || 1);

  useEffect(() => {
    if (user.cursos.length === 0) {
      history.push('/home');

      addToast({
        type: 'error',
        title: 'Nenhum curso encontrado',
      });
    }
  }, [addToast, history, user.cursos.length]);

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
            {Math.ceil(pagina / 5) !== Math.ceil(user.cursos.length / 5) && (
              <button type="button" onClick={() => setPagina(pagina + 5)}>
                <IoIosArrowForward size={24} />
              </button>
            )}
          </div>
        </div>
        <section>
          {user.cursos
            .filter(
              (curso, indice) =>
                indice + 1 >= pagina && indice + 1 <= pagina + 4,
            )
            .map(curso => (
              <Link
                to={{
                  pathname: `/editar/curso/${curso._id}`,
                  pagina,
                }}
                key={curso._id}
              >
                <div>
                  <strong>{curso.titulo}</strong>
                </div>
                <FiChevronRight size={20} />
              </Link>
            ))}
        </section>
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default EditarCursos;
