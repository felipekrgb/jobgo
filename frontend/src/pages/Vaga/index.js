import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import LayoutPadrao from '../../components/LayoutPadrao';
import Botao from '../../components/Botao';
import FotoEmpresaPadrao from '../../assets/empresa-padrao.png';

import { ContainerConteudo } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

function Vaga() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [vaga, setVaga] = useState();
  const [loadingPagina, setLoadingPagina] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCandidato, setIsCandidato] = useState(false);

  useEffect(() => {
    const getVaga = async () => {
      const response = await api.get(`/vaga/${id}`);
      const responseVaga = { ...response.data.vaga };
      setVaga({ ...responseVaga });

      responseVaga.candidatos.forEach(candidato => {
        if (candidato._id === user._id) {
          setIsCandidato(true);
        }
      });

      setLoadingPagina(false);
    };

    getVaga();
  }, [id, user._id]);

  const handleCandidatar = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.put(`/vaga/candidatar/${id}`);

      const novaCandidatura = { ...response.data.vaga };

      updateUser({ novaCandidatura });

      const novasVagas = location.vagas.filter(
        vagaAtual => vagaAtual._id !== novaCandidatura._id,
      );

      let path;
      if (novasVagas.length === 0) {
        path = '/home';
      }

      setLoading(false);
      history.push({
        pathname: path || '/vagas',
        vagas: novasVagas,
      });

      addToast({
        type: 'sucess',
        title: 'Você candidatou-se à vaga',
      });
    } catch (err) {
      setLoading(false);
      addToast({
        type: 'error',
        title: 'Erro ao candidatar-se para a vaga',
        description:
          'Ocorreu um erro ao candidatar-se para a vaga, tente novamente',
      });
    }
  }, [addToast, history, id, location.vagas, updateUser]);

  return (
    <LayoutPadrao>
      <ContainerConteudo loadingPagina={loadingPagina ? 1 : 0}>
        {loadingPagina ? (
          <FaSpinner color="#007bff" size={64} />
        ) : (
          <>
            <div className="voltar">
              <button
                type="button"
                onClick={() =>
                  isCandidato
                    ? history.push({
                        pathname: '/candidaturas',
                        pagina: location.pagina,
                      })
                    : history.push({
                        pathname: '/vagas',
                        pagina: location.pagina,
                        vagas: location.vagas,
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
                    vaga.empresa.foto
                      ? vaga.empresa.foto.url
                      : FotoEmpresaPadrao
                  }
                  alt={vaga.empresa.foto ? vaga.titulo : 'Foto padrão'}
                />
                <div className="texto">
                  <h1>{vaga.titulo}</h1>
                  <h4>{vaga.empresa.nome}</h4>
                  {vaga.empresa.descricao && <p>{vaga.empresa.descricao}</p>}
                  <hr />
                </div>
              </div>
              <div className="corpo">
                <p className="descricao">{vaga.descricao}</p>
                <div className="informacoes">
                  <div className="periodo">
                    <h3>Período:</h3>
                    <p>
                      {vaga.periodoInicio} - {vaga.periodoFim}
                    </p>
                  </div>
                  <div className="tipo">
                    <h3>Vaga para:</h3>
                    <p>{vaga.tipo}</p>
                  </div>
                </div>
              </div>
              <Botao
                isCandidato={isCandidato ? 1 : 0}
                loading={loading ? 1 : 0}
                onClick={handleCandidatar}
              >
                Candidatar-se na vaga
              </Botao>
            </section>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Vaga;
