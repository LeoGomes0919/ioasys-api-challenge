import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import createConnection from '..';

async function create() {
  const connection = await createConnection();
  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO users
    (id, "name", birth_date, uf, city, schooling, email, "password", "admin", created_at, updated_at, deleted_at)
    VALUES('${id}', 'Administrador', 'now()', 'Goiás', 'Goiânia', 'Superior', 'admin@gmail.com', '${password}', true, 'now()', 'now()', null);
  `);
  await connection.close();
}
create().then(() => console.log('Usuário admin criado'));
