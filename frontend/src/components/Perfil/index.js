import { Link } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { AvatarInput, Container } from './styles';

import FotoPadrao from '../../assets/foto-padrao.png';

import api from '../../services/api';

function Perfil() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const handleAvatarChange = useCallback(
    e => {
      const data = new FormData();

      data.append('foto', e.target.files[0]);

      api.post('/arquivo', data).then(response => {
        const foto = { ...response.data.arquivo };
        updateUser({ foto });

        addToast({
          type: 'sucess',
          title: 'Avatar atualizado',
        });
      });
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <AvatarInput>
        <img
          src={user.foto ? user.foto.url : FotoPadrao}
          alt={user.foto ? user.name : 'Foto padrão'}
        />
        <label htmlFor="foto">
          <FiCamera size={20} />
          <input
            type="file"
            id="foto"
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </label>
      </AvatarInput>

      <h1>{user.nome}</h1>
      <p>
        {user.descricao ? (
          user.descricao
        ) : (
          <strong style={{ color: 'red' }}>
            Edite seu perfil e acrescente uma breve descrição
          </strong>
        )}
      </p>
      <Link to="/editar-perfil">Editar perfil</Link>
    </Container>
  );
}

export default Perfil;
