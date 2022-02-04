import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "namnguyen",
  host: "localhost",
  database: "trip_advisor_db",
  password: "123456",
  port: 5432,
});

const query = (text, params) => {
  return pool.query(text, params);
};

export default query;
