import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', '..' ,'bd_inventario.sqlite')
  },
  useNullAsDefault : true
});

export default connection;