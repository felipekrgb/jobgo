import { useEffect, useRef, useState, useCallback } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FiClipboard, FiFileText, FiLink } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import LayoutPadrao from '../../components/LayoutPadrao';
import InputBranco from '../../components/InputBranco';
import InputTextArea from '../../components/InputTextArea';
import Botao from '../../components/Botao';

import { ContainerConteudo, Linha } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

function EditarCurso() {
  const formRef = useRef(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurso = async () => {
      const response = await api.get(`/curso/${id}`);
      const responseCurso = { ...response.data.curso };
      setCurso({ ...responseCurso });
      setLoading(false);
    };

    setLoading(true);
    getCurso();
  }, [id]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          titulo: Yup.string().required('Título obrigatório'),
          link: Yup.string().required('Link obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put(`/curso/${id}`, data);

        const cursoAtualizado = { ...response.data.curso };

        const { cursos } = user;

        let index;
        const novosCursos = cursos.filter((cursoFilter, i) => {
          if (cursoFilter._id === id) {
            index = i;
          }
          return cursoFilter._id !== id;
        });

        novosCursos.splice(index, 0, cursoAtualizado);

        updateUser({ novosCursos });

        history.push('/editar/curso');

        addToast({
          type: 'sucess',
          title: 'Curso alterado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar o curso',
          description: 'Ocorreu um erro ao editar o curso, tente novamente',
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
                    pathname: '/editar/curso',
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
              initialData={{ ...curso }}
            >
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
              <Botao type="submit">Editar curso</Botao>
            </Form>
          </>
        )}
      </ContainerConteudo>
    </LayoutPadrao>
  );
}

export default EditarCurso;
