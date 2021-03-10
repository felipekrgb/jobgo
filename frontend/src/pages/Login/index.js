import { useState, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import {
  FaBuilding,
  FaHandshake,
  FaAward,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaEnvelopeOpenText,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Background,
  ContainerComecar,
  ContainerServicos,
  ContainerContato,
  ContainerRodaPe,
  ContainerApoiadores,
} from './styles';

import FotoPrefeitura from '../../assets/prefeituraBnu.png';
import FotoACIB from '../../assets/acib.png';
import FotoCamara from '../../assets/camaraBnu.png';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Botao from '../../components/Botao';

function Login() {
  const [navbar, setNavbar] = useState(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          senha: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(false);
        await signIn({
          email: data.email,
          senha: data.senha,
        });

        history.push('/home');
      } catch (err) {
        setLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, history, addToast],
  );

  const changeNavBar = useCallback(() => {
    if (window.scrollY >= 200) {
      setNavbar(() => false);
    } else {
      setNavbar(() => true);
    }
  }, []);

  window.addEventListener('scroll', changeNavBar);

  return (
    <>
      <Navbar color="#fff" colorlogo="#000" scroll={navbar ? 1 : 0} />
      <Container>
        <Background>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Login</h1>
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="senha"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Botao type="submit" loading={loading ? 1 : 0}>
              Entrar
            </Botao>

            <Link to="/esqueci-senha">Esqueci minha senha</Link>

            <Link to="/registro">
              <FiLogIn />
              Criar conta
            </Link>
          </Form>
        </Background>
      </Container>
      <ContainerComecar>
        <h2>Nós temos o que você precisa!</h2>
        <hr />
        <p>Procure vagas e cursos para você concluir seus objetivos!</p>
        <Link to="registro">Comece!</Link>
      </ContainerComecar>
      <ContainerServicos>
        <h2>Nossos serviços</h2>
        <hr />

        <section>
          <div>
            <FaHandshake size={100} />
            <h3>Vagas</h3>
            <p>Procure as vagas mais cobiçadas do mercado!</p>
          </div>

          <div>
            <FaBuilding size={100} />
            <h3>Empresas</h3>
            <p>Diversas vagas disponíveis de diversas empresas.</p>
          </div>

          <div>
            <FaAward size={100} />
            <h3>Cursos</h3>
            <p>Realize cursos oferecidos por instituições de ensino!</p>
          </div>

          <div>
            <FaChalkboardTeacher size={100} />
            <h3>Simples</h3>
            <p>Interface simples, rápida e objetiva</p>
          </div>
        </section>
      </ContainerServicos>
      <ContainerContato>
        <h2>Entre em contato!</h2>
        <hr />
        <h3>Ao clicar em um dos botões abaixo você será redirecionado</h3>
        <div>
          <a type="button" href="mailto:(47)98441-4471">
            <FaPhoneAlt size={72} />
          </a>
          <a type="button" href="jobgocontato@gmail.com">
            <FaEnvelopeOpenText size={72} />
          </a>
        </div>
      </ContainerContato>
      <ContainerApoiadores>
        <h2>Nossos apoiadores</h2>
        <hr />

        <section>
          <div>
            <img src={FotoPrefeitura} alt="Foto PMB" />
            <h3>Prefeitura Municipal de Blumenau</h3>
          </div>

          <div>
            <img src={FotoACIB} alt="Foto ACIB" />
            <h3>Associação Comercial Industrial Blumenau</h3>
          </div>

          <div>
            <img src={FotoCamara} alt="Foto Camara" />
            <h3>Câmara Municipal de Blumenau</h3>
          </div>
        </section>
      </ContainerApoiadores>
      <ContainerRodaPe>
        <div>
          <a target="blank" href="https://www.facebook.com/Thejobgo">
            <FaFacebook size={25} />
          </a>
          <a target="blank" href="https://www.instagram.com/thejobgo/">
            <FaInstagram size={25} />
          </a>
          <a target="blank" href="https://twitter.com/ThejobGo">
            <FaTwitter size={25} />
          </a>
          <a
            target="blank"
            href="https://www.youtube.com/channel/UC0PBv255goqXI2VYg4V-foA"
          >
            <FaYoutube size={25} />
          </a>
        </div>
        <h4>© 2021 - JobGO</h4>
      </ContainerRodaPe>
    </>
  );
}

export default Login;
