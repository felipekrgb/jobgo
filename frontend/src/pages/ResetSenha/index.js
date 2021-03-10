import { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { Container, Background } from './styles';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Botao from '../../components/Botao';
import api from '../../services/api';

function ResetSenha() {
  const formRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          senha: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
          repetirSenha: Yup.string().oneOf(
            [Yup.ref('senha'), null],
            'As duas senhas devem ser iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { senha, repetirSenha } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('reset-senha', {
          senha,
          repetirSenha,
          token,
        });

        history.push('/');

        addToast({
          type: 'sucess',
          title: 'Senha recuperada com sucesso',
          description: 'Sua senha foi alterada, faça login novamente',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      <Navbar color="transparent" colorlogo="#fff" />
      <Container>
        <Background>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="senha"
              type="password"
              placeholder="Nova senha"
              icon={FiLock}
            />
            <Input
              name="repetirSenha"
              type="password"
              placeholder="Confirmação da nova senha"
              icon={FiLock}
            />
            <Botao type="submit">Alterar senha</Botao>
          </Form>
        </Background>
      </Container>
    </>
  );
}
export default ResetSenha;
