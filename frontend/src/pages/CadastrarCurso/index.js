import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiClipboard, FiFileText, FiLink } from 'react-icons/fi';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { ContainerConteudo, Linha } from './styles';

import LayoutPadrao from '../../components/LayoutPadrao';
import InputBranco from '../../components/InputBranco';
import InputTextArea from '../../components/InputTextArea';
import Botao from '../../components/Botao';

function CadastrarCurso() {
  const formRef = useRef(null);

  const { updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      try {
        // Retira os erros dos inputs
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          titulo: Yup.string().required('Título obrigatório'),
          link: Yup.string().required('Link obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/curso', data);

        const curso = { ...response.data.curso };

        updateUser({ curso });

        history.push('/home');

        addToast({
          type: 'sucess',
          title: 'Curso criado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar o curso',
          description: 'Ocorreu um erro ao criar o curso, tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <LayoutPadrao>
      <ContainerConteudo>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Linha>
            <InputBranco
              name="titulo"
              placeholder="Título do curso"
              icon={FiClipboard}
            />
          </Linha>
          <Linha>
            <InputBranco
              name="link"
              placeholder="Link para o site do curso"
              icon={FiLink}
            />
          </Linha>
          <InputTextArea
            name="descricao"
            placeholder="Descrição"
            icon={FiFileText}
          />
          <Botao type="submit">Criar curso</Botao>
        </Form>
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default CadastrarCurso;
