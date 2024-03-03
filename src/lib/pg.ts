import { Pool } from 'pg';
import { config } from '../common/config';
const pool = new Pool({
  connectionString: config.databaseUrl,
});

export class Postgres {
  async fetch<ResponseType, TArg>(
    SQL: string,
    ...args: Array<TArg>
  ): Promise<ResponseType> {
    const clien = await pool.connect();
    try {
      const {
        rows: [row],
      } = await clien.query(SQL, args);
      return row;
    } finally {
      clien.release();
    }
  }

  async fetchAll<ResponseType, TArg = undefined>(
    SQL: string,
    ...args: Array<TArg>
  ): Promise<Array<ResponseType>> {
    const clien = await pool.connect();
    try {
      const { rows } = await clien.query(SQL, args);
      return rows;
    } finally {
      clien.release();
    }
  }

  get getPool(): Pool {
    return pool;
  }
}
