// Switch serve para exibir apenas uma rota
import { Switch } from 'react-router-dom';
import Rota from './Rota';

import Login from '../pages/Login';
import Registro from '../pages/Registro';
import EsqueceuSenha from '../pages/EsqueceuSenha';
import ResetSenha from '../pages/ResetSenha';
import Home from '../pages/Home';
import EditarPerfil from '../pages/EditarPerfil';

import Vagas from '../pages/Vagas';
import Vaga from '../pages/Vaga';
import Candidaturas from '../pages/Candidaturas';
import Cursos from '../pages/Cursos';

import CadastrarVaga from '../pages/CadastrarVaga';
import EditarVagas from '../pages/EditarVagas';
import EditarVaga from '../pages/EditarVaga';
import CandidatosVagas from '../pages/CandidatosVagas';
import CandidatosVaga from '../pages/CandidatosVaga';
import Candidato from '../pages/Candidato';

import CadastrarCurso from '../pages/CadastrarCurso';
import EditarCursos from '../pages/EditarCursos';
import EditarCurso from '../pages/EditarCurso';
import Curso from '../pages/Curso';

function Routes() {
  return (
    <Switch>
      <Rota path="/" exact component={Login} />
      <Rota path="/registro" component={Registro} />
      <Rota path="/esqueci-senha" component={EsqueceuSenha} />
      <Rota path="/reset-senha" component={ResetSenha} />

      <Rota path="/home" component={Home} isPrivate />
      <Rota path="/editar-perfil" component={EditarPerfil} isPrivate />

      <Rota path="/vagas" exact component={Vagas} isPrivate />
      <Rota path="/vaga/:id" exact component={Vaga} isPrivate />
      <Rota path="/candidaturas" component={Candidaturas} isPrivate />
      <Rota path="/cursos" component={Cursos} isPrivate />
      <Rota path="/curso/:id" exact component={Curso} isPrivate />

      <Rota path="/cadastro/vaga" exact component={CadastrarVaga} isPrivate />
      <Rota path="/editar/vaga" exact component={EditarVagas} isPrivate />
      <Rota path="/editar/vaga/:id" exact component={EditarVaga} isPrivate />
      <Rota
        path="/candidatos/vagas"
        exact
        component={CandidatosVagas}
        isPrivate
      />
      <Rota
        path="/candidatos/vaga/:id"
        exact
        component={CandidatosVaga}
        isPrivate
      />
      <Rota path="/candidato/:id" exact component={Candidato} isPrivate />

      <Rota path="/cadastro/curso" exact component={CadastrarCurso} isPrivate />
      <Rota path="/editar/curso" exact component={EditarCursos} isPrivate />
      <Rota path="/editar/curso/:id" exact component={EditarCurso} isPrivate />
    </Switch>
  );
}

export default Routes;
