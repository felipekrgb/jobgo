import { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoSchoolOutline } from 'react-icons/io5';
import { MdAccountCircle, MdWork } from 'react-icons/md';
import { BiBook } from 'react-icons/bi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { cnpj } from 'cpf-cnpj-validator';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container, Background, Linha, Titulo, BotaoOpcao } from './styles';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import Botao from '../../components/Botao';

function Registro() {
  const [usuario, setUsuario] = useState('pessoa');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);

        // Retira os erros dos inputs
        formRef.current?.setErrors({});

        let schema;

        if (usuario === 'pessoa') {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            telefone: Yup.string().required('Digite um telefone'),
            senha: Yup.string().min(
              6,
              'A senha precisa ter no mínimo 6 dígitos',
            ),
          });
        } else if (usuario === 'empresa') {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            cnpj: Yup.string()
              .required('CNPJ obrigatório')
              .test('valida-cnpj', 'Digite um CNPJ válido', async value =>
                cnpj.isValid(value),
              ),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            telefone: Yup.string().required('Digite um telefone'),
            senha: Yup.string().min(
              6,
              'A senha precisa ter no mínimo 6 dígitos',
            ),
          });
        } else if (usuario === 'escola') {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            cnpj: Yup.string()
              .required('CNPJ obrigatório')
              .test('valida-cnpj', 'Digite um CNPJ válido', async value =>
                cnpj.isValid(value),
              ),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            telefone: Yup.string().required('Digite um telefone'),
            senha: Yup.string().min(
              6,
              'A senha precisa ter no mínimo 6 dígitos',
            ),
          });
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        if (usuario === 'pessoa') {
          await api.post('/pessoa', data);
        } else if (usuario === 'empresa') {
          await api.post('/empresa', data);
        } else if (usuario === 'escola') {
          await api.post('/escola', data);
        }

        setLoading(false);
        history.push('/');

        addToast({
          type: 'sucess',
          title: 'Cadastro realizado com sucesso',
          description: 'Você já pode realizar seu login',
        });
      } catch (err) {
        setLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            err.response.data.error ||
            'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history, usuario],
  );

  return (
    <>
      <Navbar color="rgba(0, 0, 0, 0.7)" colorlogo="#fff" link="/" />
      <Container>
        <Background>
          <Titulo>
            <h1>Faça seu Registro</h1>
            <div>
              <BotaoOpcao
                type="button"
                selected={usuario === 'pessoa' ? 1 : 0}
                onClick={() => setUsuario('pessoa')}
              >
                <MdAccountCircle size={36} />
                <p>Pessoa</p>
              </BotaoOpcao>
              <BotaoOpcao
                type="button"
                selected={usuario === 'empresa' ? 1 : 0}
                onClick={() => setUsuario('empresa')}
              >
                <MdWork size={36} />
                <p>Empresa</p>
              </BotaoOpcao>
              <BotaoOpcao
                type="button"
                selected={usuario === 'escola' ? 1 : 0}
                onClick={() => setUsuario('escola')}
              >
                <BiBook size={36} />
                <p>Instituição de Ensino</p>
              </BotaoOpcao>
            </div>
          </Titulo>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={usuario === 'pessoa' ? { tipoVaga: 'estagio' } : null}
          >
            {usuario === 'pessoa' && (
              <>
                <Linha>
                  <Input name="nome" placeholder="Nome" icon={FiUser} />
                </Linha>
                <Linha>
                  <Input name="email" placeholder="E-mail" icon={FiMail} />
                  <InputMask
                    mask="(99) 99999-9999"
                    name="telefone"
                    placeholder="Telefone"
                    icon={FiPhone}
                  />
                </Linha>
                <Linha>
                  <Input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    icon={FiLock}
                  />
                </Linha>
                <Linha>
                  <p>
                    *Lembre-se: após o cadastro, você poderá editar seu perfil e
                    acrescentar informações. Complete as informações para você
                    se destacar.
                  </p>
                </Linha>
              </>
            )}
            {usuario === 'empresa' && (
              <>
                <Linha>
                  <Input
                    name="nome"
                    placeholder="Nome da empresa"
                    icon={FaBuilding}
                  />
                  <InputMask
                    mask="99.999.999/9999-99"
                    name="cnpj"
                    placeholder="CNPJ"
                    icon={AiOutlineFileSearch}
                  />
                </Linha>
                <Linha>
                  <Input name="email" placeholder="E-mail" icon={FiMail} />
                  <InputMask
                    mask="(99) 99999-9999"
                    name="telefone"
                    placeholder="Telefone"
                    icon={FiPhone}
                  />
                </Linha>
                <Linha>
                  <Input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    icon={FiLock}
                  />
                </Linha>
                <Linha>
                  <p>
                    *Lembre-se: após o cadastro, você poderá editar seu perfil e
                    acrescentar informações. Complete as informações para você
                    receber mais candidatos.
                  </p>
                </Linha>
              </>
            )}
            {usuario === 'escola' && (
              <>
                <Linha>
                  <Input
                    name="nome"
                    placeholder="Nome da instituição de ensino"
                    icon={IoSchoolOutline}
                  />
                  <InputMask
                    mask="99.999.999/9999-99"
                    name="cnpj"
                    placeholder="CNPJ"
                    icon={AiOutlineFileSearch}
                  />
                </Linha>
                <Linha>
                  <Input name="email" placeholder="E-mail" icon={FiMail} />
                  <InputMask
                    mask="(99) 99999-9999"
                    name="telefone"
                    placeholder="Telefone"
                    icon={FiPhone}
                  />
                </Linha>
                <Linha>
                  <Input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    icon={FiLock}
                  />
                </Linha>
                <Linha>
                  <p>
                    *Lembre-se: após o cadastro, você poderá editar seu perfil e
                    acrescentar informações. Complete as informações para você
                    receber mais alunos.
                  </p>
                </Linha>
              </>
            )}
            <Botao type="submit" loading={loading ? 1 : 0}>
              Cadastrar-se
            </Botao>
          </Form>
        </Background>
      </Container>
    </>
  );
}

export default Registro;
