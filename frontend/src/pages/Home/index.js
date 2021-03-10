import {
  FcSearch,
  FcBriefcase,
  FcReading,
  FcFinePrint,
  FcGraduationCap,
  FcOpenedFolder,
} from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { ContainerConteudo } from './styles';

import LayoutPadrao from '../../components/LayoutPadrao';

function Home() {
  const { user } = useAuth();

  return (
    <LayoutPadrao>
      {console.log(user)}
      <ContainerConteudo>
        {user.type === 'pessoa' && (
          <>
            <Link to="/vagas">
              <FcSearch size={64} />
              <div>
                <h1>Vagas</h1>
                <p>Acesse as vagas</p>
              </div>
            </Link>
            <Link to="/candidaturas">
              <FcBriefcase size={64} />
              <div>
                <h1>Candidaturas</h1>
                <p>Acesse as vagas que você se cadastrou</p>
              </div>
            </Link>
            <Link to="/cursos">
              <FcReading size={64} />
              <div>
                <h1>Cursos</h1>
                <p>Acesse os cursos</p>
              </div>
            </Link>
          </>
        )}

        {user.type === 'empresa' && (
          <>
            <Link to="/cadastro/vaga">
              <FcBriefcase size={64} />
              <div>
                <h1>Cadastrar vaga</h1>
                <p>Cadastre suas vagas para receber candidatos</p>
              </div>
            </Link>
            <Link to="/editar/vaga">
              <FcFinePrint size={64} />
              <div>
                <h1>Editar vaga</h1>
                <p>Edite ou exclua suas vagas</p>
              </div>
            </Link>
            <Link to="/candidatos/vagas">
              <FcSearch size={64} />
              <div>
                <h1>Candidaturas</h1>
                <p>Acesse os candidatos das suas vagas</p>
              </div>
            </Link>
          </>
        )}

        {user.type === 'escola' && (
          <>
            <Link to="/cadastro/curso">
              <FcGraduationCap size={64} />
              <div>
                <h1>Cadastrar curso</h1>
                <p>Cadastre seu curso para receber alunos</p>
              </div>
            </Link>
            <Link to="/editar/curso">
              <FcOpenedFolder size={64} />
              <div>
                <h1>Editar curso</h1>
                <p>Edite ou exclua seus cursos</p>
              </div>
            </Link>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default Home;
