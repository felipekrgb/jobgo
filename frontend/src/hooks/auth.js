import { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@JobGO:token');
    const user = localStorage.getItem('@JobGO:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('session', {
      email,
      senha,
    });

    const { token, user, tipo } = response.data;

    user.type = tipo;

    localStorage.setItem('@JobGO:token', token);
    localStorage.setItem('@JobGO:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@JobGO:token');
    localStorage.removeItem('@JobGO:user');

    setData({});
  }, []);

  const updateUser = useCallback(
    updateData => {
      let user = {
        ...data.user,
      };

      if (updateData.vaga) {
        user.vagas = [...data.user.vagas];
        user.vagas.push(updateData.vaga);
      } else if (updateData.curso) {
        user.cursos = [...data.user.cursos];
        user.cursos.push(updateData.curso);
      } else if (updateData.novasVagas) {
        user.vagas = updateData.novasVagas;
      } else if (updateData.novosCursos) {
        user.cursos = updateData.novosCursos;
      } else if (updateData.novaCandidatura) {
        user.candidaturas = [...data.user.candidaturas];
        user.candidaturas.push(updateData.novaCandidatura);
      } else {
        user = {
          ...user,
          ...updateData,
        };
      }

      localStorage.setItem('@JobGO:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token, data.user],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser utilizado com um AuthProvider');
  }

  return context;
}
