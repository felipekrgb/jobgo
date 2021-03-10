import { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { Container, Background } from './styles';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Botao from '../../components/Botao';
import api from '../../services/api';

function EsqueceuSenha() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('esqueci-senha', {
          email: data.email,
        });

        addToast({
          type: 'sucess',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      } finally {
        setLoading(false);
        history.push('/');
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Navbar color="transparent" colorlogo="#fff" />
      <Container>
        <Background>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Botao loading={loading ? 1 : 0} type="submit">
              Recuperar
            </Botao>
          </Form>
        </Background>
      </Container>
    </>
  );
}
export default EsqueceuSenha;
