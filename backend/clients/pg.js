import { Pool } from "pg";
import {
  ENV,
  POSTGRES_HOST,
  POSTGRES_MAIN_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
} from "../env.js";
console.log(ENV , POSTGRES_HOST , POSTGRES_MAIN_DB , POSTGRES_PASSWORD , POSTGRES_PORT , POSTGRES_TEST_DB , POSTGRES_USER)
// make sure that everything is same for both prod db and test db except db name.
const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: ENV === "test" ? POSTGRES_TEST_DB : POSTGRES_MAIN_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  ssl: {
    rejectUnauthorized: true // set to true if you want to verify SSL certificates
  }
});

export default pool;
