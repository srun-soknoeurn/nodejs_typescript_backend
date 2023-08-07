import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool();
//get all users
export async function selectAllUsers() {
  const query = "SELECT * FROM users";
  const results = await pool.query(query);
  return results;
}
//get user by id
export async function selectUserById(id:number) {
  const query = `SELECT * FROM users WHERE id=$1`;
  const results = await pool.query(query, [id]);
  return results;
}
//create user
export async function createUser(first_name:string, last_name:string, date_of_birth:Date, email:string, password:string, gender:string) {
  const query = `INSERT INTO users (first_name, last_name, date_of_birth, email, password, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const results = await pool.query(query, [first_name, last_name, date_of_birth, email, password, gender]);
  return results;
}
//update user
export async function updateUser(first_name:string, last_name:string, date_of_birth:Date, email:string, password:string, gender:string, id:number) {
  const query = `UPDATE users SET first_name=$1, last_name=$2, date_of_birth=$3, email=$4, password=$5, gender=$6 WHERE id=$7`;
  const results = await pool.query(query, [first_name, last_name, date_of_birth, email, password, gender, id]);
  return results;
}
