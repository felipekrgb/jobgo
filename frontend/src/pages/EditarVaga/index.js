import { useEffect, useRef, useState, useCallback } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import LayoutPadrao from '../../components/LayoutPadrao';
import InputBranco from '../../components/InputBranco';
import InputTextArea from '../../components/InputTextArea';
import Botao from '../../components/Botao';
import Radio from '../../components/Radio';

import { ContainerConteudo, Linha } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

function EditarVaga() {
  const formRef = useRef(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [vaga, setVaga] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVaga = async () => {
      const response = await api.get(`/vaga/${id}`);
      const responseVaga = { ...response.data.vaga };
      setVaga({ ...responseVaga });
      setLoading(false);
    };

    setLoading(true);
    getVaga();
  }, [id]);

  const handleSubmit = useCallback(
    async data => {
      try {
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

        const response = await api.put(`/vaga/${id}`, data);

        const vagaAtualizada = { ...response.data.vaga };

        const { vagas } = user;

        let index;
        const novasVagas = vagas.filter((vagaFilter, i) => {
          if (vagaFilter._id === id) {
            index = i;
          }
          return vagaFilter._id !== id;
        });

        novasVagas.splice(index, 0, vagaAtualizada);

        updateUser({ novasVagas });

        history.push('/editar/vaga');

        addToast({
          type: 'sucess',
          title: 'Vaga alterada com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar a vaga',
          description: 'Ocorreu um erro ao editar a vaga, tente novamente',
        });
      }
    },
    [addToast, history, id, updateUser, user],
  );

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
                    pathname: '/editar/vaga',
                    pagina: location.pagina,
                  })
                }
              >
                <IoIosArrowBack size={24} />
                Voltar
              </button>
            </div>
            <Form
              onSubmit={handleSubmit}
              ref={formRef}
              initialData={{ ...vaga }}
            >
              <Linha>
                <InputBranco
                  name="titulo"
                  placeholder="Título da vaga"
                  icon={FiMail}
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
                <InputBranco
                  className="radioTempo"
                  type="time"
                  name="periodoFim"
                />
              </Linha>
              <InputTextArea
                name="descricao"
                placeholder="Descrição"
                icon={FiMail}
              />
              <Botao type="submit">Editar vaga</Botao>
            </Form>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default EditarVaga;
