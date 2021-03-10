import { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiClipboard, FiFileText } from 'react-icons/fi';
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
import Radio from '../../components/Radio';

function CadastrarVaga() {
  const formRef = useRef(null);

  const { updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        // Retira os erros dos inputs
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          titulo: Yup.string().required('Título obrigatório'),
          tipo: Yup.string().required('Tipo da vaga obrigatório'),
          periodoInicio: Yup.string().required('Período de início obrigatório'),
          periodoFim: Yup.string().required('Período final obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/vaga', data);

        const vaga = { ...response.data.vaga };

        updateUser({ vaga });

        setLoading(false);
        history.push('/home');

        addToast({
          type: 'sucess',
          title: 'Vaga criada com sucesso',
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
          title: 'Erro ao criar a vaga',
          description: 'Ocorreu um erro ao criar a vaga, tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <LayoutPadrao>
      <ContainerConteudo>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{ tipo: 'Estágio' }}
        >
          <Linha>
            <InputBranco
              name="titulo"
              placeholder="Título da vaga"
              icon={FiClipboard}
            />
            <div className="radio">
              <h3>Tipo da vaga:</h3>
              <Radio
                name="tipo"
                options={[
                  { id: 'Estágio', label: 'Estágio' },
                  { id: 'Jovem Aprendiz', label: 'Jovem Aprendiz' },
                ]}
              />
            </div>
          </Linha>
          <Linha className="linhaTempo">
            <h3>Período:</h3>
            <InputBranco
              className="radioTempo"
              type="time"
              name="periodoInicio"
            />
            <h4>até</h4>
            <InputBranco className="radioTempo" type="time" name="periodoFim" />
          </Linha>
          <InputTextArea
            name="descricao"
            placeholder="Descrição"
            icon={FiFileText}
          />
          <Botao type="submit" loading={loading ? 1 : 0}>
            Criar vaga
          </Botao>
        </Form>
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default CadastrarVaga;
