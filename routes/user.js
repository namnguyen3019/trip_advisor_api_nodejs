import express from "express";
import query from "../db/index.js";
const userRoutes = express.Router();

userRoutes
  .route("/:id")
  .get((req, res, next) => {
    const { id } = req.params;
    query("SELECT * FROM company WHERE id = $1", [id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    const text = "DELETE FROM company WHERE id = $1 RETURNING *";
    const values = [id];
    query(text, values)
      .then((result) => res.send(result.rows[0]))
      .catch(next);
  });

userRoutes
  .route("/")
  .get((req, res, next) => {
    query(`SELECT * FROM company LIMIT 10`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { id, name, age, address, salary, join_date } = req.body.user;
    const values = [id, name, age, address, salary, join_date];
    const text =
      "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    query(text, values)
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    const { id, name, age, address, salary, join_date } = req.body.user;
    const values = [id, name, age, address, salary, join_date];
    const text =
      "UPDATE company set id=$1, name=$2, age=$3, address=$4, salary=$5, join_date=$6 WHERE id = $1";
    query(text, values)
      .then(() => res.send(`Updated user ${name}`))
      .catch(next);
  });

export default userRoutes;
