import jwt from 'jsonwebtoken';

// Promisify para usar async e await com o jwt.verify
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não providenciado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    const { id, tipo } = decoded;

    req.userId = id;
    req.userTipo = tipo;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
