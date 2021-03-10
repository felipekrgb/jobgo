import { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiLock,
  FiFileText,
  FiUpload,
  FiDownload,
  FiPhone,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { cnpj } from 'cpf-cnpj-validator';
import { AiOutlineFileSearch } from 'react-icons/ai';
import getValidationErrors from '../../utils/getValidationErrors';

import { ContainerConteudo, Linha } from './styles';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import LayoutPadrao from '../../components/LayoutPadrao';
import Botao from '../../components/Botao';
import InputBranco from '../../components/InputBranco';
import InputMaskBranco from '../../components/InputMaskBranco';
import InputTextArea from '../../components/InputTextArea';

function EditarPerfil() {
  const formRef = useRef(null);
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      try {
        // Retira os erros dos inputs
        formRef.current?.setErrors({});

        let schema;

        if (user.type === 'pessoa') {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            telefone: Yup.string().required('Digite um telefone'),
            descricao: Yup.string(),
            senhaAtual: Yup.string(),
            novaSenha: Yup.string().when('senhaAtual', {
              is: val => !!val.length,
              then: Yup.string().required('Nova senha obrigatória'),
              otherwise: Yup.string(),
            }),
            repetirNovaSenha: Yup.string()
              .when('senhaAtual', {
                is: val => !!val.length,
                then: Yup.string().required('Nova senha obrigatória'),
                otherwise: Yup.string(),
              })
              .oneOf(
                [Yup.ref('novaSenha'), null],
                'As duas senhas devem ser iguais',
              ),
          });
        } else if (user.type === 'empresa' || user.type === 'escola') {
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
            descricao: Yup.string(),
            senhaAtual: Yup.string(),
            novaSenha: Yup.string().when('senhaAtual', {
              is: val => !!val.length,
              then: Yup.string().required('Nova senha obrigatória'),
              otherwise: Yup.string(),
            }),
            repetirNovaSenha: Yup.string()
              .when('senhaAtual', {
                is: val => !!val.length,
                then: Yup.string().required('Nova senha obrigatória'),
                otherwise: Yup.string(),
              })
              .oneOf(
                [Yup.ref('novaSenha'), null],
                'As duas senhas devem ser iguais',
              ),
          });
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        let response;
        let formData;
        let userResponse;

        if (user.type === 'pessoa') {
          formData = {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            ...(data.descricao
              ? {
                  descricao: data.descricao,
                }
              : {}),
            ...(data.senhaAtual
              ? {
                  senhaAtual: data.senhaAtual,
                  novaSenha: data.novaSenha,
                  repetirNovaSenha: data.repetirNovaSenha,
                }
              : {}),
          };

          response = await api.put('/pessoa', formData);

          userResponse = response.data.pessoa;
        }
        if (user.type === 'empresa') {
          formData = {
            nome: data.nome,
            cnpj: data.cnpj,
            email: data.email,
            telefone: data.telefone,
            ...(data.descricao
              ? {
                  descricao: data.descricao,
                }
              : {}),
            ...(data.senhaAtual
              ? {
                  senhaAtual: data.senhaAtual,
                  novaSenha: data.novaSenha,
                  repetirNovaSenha: data.repetirNovaSenha,
                }
              : {}),
          };

          response = await api.put('/empresa', formData);

          userResponse = response.data.empresa;
        } else if (user.type === 'escola') {
          formData = {
            nome: data.nome,
            cnpj: data.cnpj,
            email: data.email,
            telefone: data.telefone,
            ...(data.descricao
              ? {
                  descricao: data.descricao,
                }
              : {}),
            ...(data.senhaAtual
              ? {
                  senhaAtual: data.senhaAtual,
                  novaSenha: data.novaSenha,
                  repetirNovaSenha: data.repetirNovaSenha,
                }
              : {}),
          };

          response = await api.put('/escola', formData);

          userResponse = response.data.escola;
        }

        updateUser(userResponse);

        history.push('/home');

        addToast({
          type: 'sucess',
          title: 'Perfil editado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar perfil',
          description: 'Ocorreu um erro ao editar seu perfil, tente novamente',
        });
      }
    },
    [addToast, history, updateUser, user.type],
  );

  const handlePdfChange = useCallback(
    e => {
      const data = new FormData();

      data.append('curriculo', e.target.files[0]);

      api.post('/arquivo', data).then(response => {
        const curriculo = { ...response.data.arquivo };
        updateUser({ curriculo });

        addToast({
          type: 'sucess',
          title: 'Currículo anexado',
        });
      });
    },
    [addToast, updateUser],
  );

  return (
    <LayoutPadrao>
      <ContainerConteudo>
        <Form
          ref={formRef}
          initialData={
            (user.type === 'pessoa' && {
              nome: user.nome,
              email: user.email,
              telefone: user.telefone,
              ...(user.descricao
                ? {
                    descricao: user.descricao,
                  }
                : {}),
            }) ||
            ((user.type === 'empresa' || user.type === 'escola') && {
              nome: user.nome,
              cnpj: user.cnpj,
              email: user.email,
              telefone: user.telefone,
              ...(user.descricao
                ? {
                    descricao: user.descricao,
                  }
                : {}),
            })
          }
          onSubmit={handleSubmit}
        >
          {user.type === 'pessoa' && (
            <>
              <Linha>
                <InputBranco name="nome" placeholder="Nome" icon={FiUser} />
              </Linha>
              <Linha>
                <InputBranco name="email" placeholder="E-mail" icon={FiMail} />
                <InputMaskBranco
                  mask="(99) 99999-9999"
                  name="telefone"
                  placeholder="Telefone"
                  icon={FiPhone}
                />
              </Linha>
              <Linha>
                <InputTextArea
                  name="descricao"
                  placeholder="Descrição"
                  icon={FiFileText}
                />
              </Linha>
              <hr />
              <Linha>
                <InputBranco
                  type="password"
                  name="senhaAtual"
                  placeholder="Senha atual"
                  icon={FiLock}
                />
              </Linha>
              <Linha>
                <InputBranco
                  type="password"
                  name="novaSenha"
                  placeholder="Nova senha"
                  icon={FiLock}
                />
                <InputBranco
                  type="password"
                  name="repetirNovaSenha"
                  placeholder="Confirmar nova senha"
                  icon={FiLock}
                />
              </Linha>
            </>
          )}

          {(user.type === 'empresa' || user.type === 'escola') && (
            <>
              <Linha>
                <InputBranco name="nome" placeholder="Nome" icon={FiUser} />
                <InputBranco
                  name="cnpj"
                  placeholder="CNPJ"
                  icon={AiOutlineFileSearch}
                />
              </Linha>
              <Linha>
                <InputBranco name="email" placeholder="E-mail" icon={FiMail} />
                <InputMaskBranco
                  mask="(99) 99999-9999"
                  name="telefone"
                  placeholder="Telefone"
                  icon={FiPhone}
                />
              </Linha>
              <Linha>
                <InputTextArea
                  name="descricao"
                  placeholder="Descrição"
                  icon={FiFileText}
                />
              </Linha>
              <hr />
              <Linha>
                <InputBranco
                  type="password"
                  name="senhaAtual"
                  placeholder="Senha atual"
                  icon={FiLock}
                />
              </Linha>
              <Linha>
                <InputBranco
                  type="password"
                  name="novaSenha"
                  placeholder="Nova senha"
                  icon={FiLock}
                />
                <InputBranco
                  type="password"
                  name="repetirNovaSenha"
                  placeholder="Confirmar nova senha"
                  icon={FiLock}
                />
              </Linha>
            </>
          )}
          <Linha>
            {user.type === 'pessoa' && (
              <div className="pdf">
                <label htmlFor="curriculo">
                  <FiUpload size={20} />
                  {user.curriculo ? 'Mudar currículo' : 'Anexar currículo'}
                  <input
                    type="file"
                    id="curriculo"
                    onChange={handlePdfChange}
                    accept="application/pdf"
                  />
                </label>
                {user.curriculo && (
                  <a href={user.curriculo.url} target="blank">
                    <FiDownload size={20} />
                    Acessar currículo
                  </a>
                )}
              </div>
            )}

            <Botao type="submit">Salvar</Botao>
          </Linha>
        </Form>
      </ContainerConteudo>
    </LayoutPadrao>
  );
}
export default EditarPerfil;
