import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import { FiExternalLink } from 'react-icons/fi';
import LayoutPadrao from '../../components/LayoutPadrao';
import FotoEmpresaPadrao from '../../assets/empresa-padrao.png';

import { ContainerConteudo } from './styles';
import api from '../../services/api';

function Curso() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurso = async () => {
      const response = await api.get(`/curso/${id}`);
      const responseCurso = { ...response.data.curso };
      setCurso({ ...responseCurso });

      setLoading(false);
    };

    getCurso();
  }, [history, id]);

  return (
    <LayoutPadrao>
      <ContainerConteudo loading={loading ? 1 : 0}>
        {loading ? (
          <FaSpinner color="#007bff" size={64} />
        ) : (
          <>
            <div className="voltar">
              <button
                type="button"
                onClick={() =>
                  history.push({
                    pathname: '/cursos',
                    pagina: location.pagina,
                    cursos: location.cursos,
                  })
                }
              >
                <IoIosArrowBack size={24} />
                Voltar
              </button>
            </div>
            <section>
              <div className="header">
                <img
                  src={
                    curso.escola.foto
                      ? curso.escola.foto.url
                      : FotoEmpresaPadrao
                  }
                  alt={curso.escola.foto ? curso.titulo : 'Foto padrão'}
                />
                <div className="texto">
                  <h1>{curso.titulo}</h1>
                  <h4>{curso.escola.nome}</h4>
                  {curso.escola.descricao && <p>{curso.escola.descricao}</p>}
                  <hr />
                </div>
              </div>
              <div className="corpo">
                <p className="descricao">{curso.descricao}</p>
              </div>
              <a href={curso.link} target="blank">
                <FiExternalLink size={20} />
                Acessar curso
              </a>
            </section>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Curso;
