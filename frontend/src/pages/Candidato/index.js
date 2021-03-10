import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import LayoutPadrao from '../../components/LayoutPadrao';
import FotoPadrao from '../../assets/foto-padrao.png';

import { ContainerConteudo } from './styles';
import api from '../../services/api';

function Candidato() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [candidato, setCandidato] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCandidato = async () => {
      const response = await api.get(`/pessoa/${id}`);
      const responseCandidato = { ...response.data.pessoa };
      setCandidato({ ...responseCandidato });
      setLoading(false);
    };

    getCandidato();
  }, [id]);

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
                    pathname: `/candidatos/vaga/${location.id}`,
                    pagina: location.pagina,
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
                  src={candidato.foto ? candidato.foto.url : FotoPadrao}
                  alt={candidato.foto ? candidato.nome : 'Foto padrão'}
                />
                <div className="texto">
                  <h1>{candidato.nome}</h1>
                  <hr />
                </div>
              </div>
              <div className="corpo">
                <p className="descricao">{candidato.descricao}</p>
                <div className="informacoes">
                  <div className="email">
                    <h3>E-mail:</h3>
                    <p>{candidato.email}</p>
                  </div>
                  <div className="telefone">
                    <h3>Telefone:</h3>
                    <p>{candidato.telefone}</p>
                  </div>
                </div>
              </div>
              {candidato.curriculo && (
                <a href={candidato.curriculo.url} target="blank">
                  Visualizar currículo
                </a>
              )}
            </section>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Candidato;
