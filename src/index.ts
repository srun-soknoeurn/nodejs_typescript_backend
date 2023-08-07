import {
  selectAllUsers,
  selectUserById,
  createUser,
  updateUser,
} from "./config/connection";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 5500;
//call body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//get all users
app.get("/", async (req: Request, res: Response) => {
  const result = await selectAllUsers();
  res.json(result.rows);
});
//get user by id
app.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await selectUserById(id);
    console.log("id", result);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});
//create user
app.post("/", async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, date_of_birth, email, password, gender } = req.body;
    const result = await createUser(first_name, last_name, date_of_birth, email, password, gender);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});
//update user
app.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { first_name, last_name, date_of_birth, email, password, gender } = req.body;
    const result = await updateUser(first_name, last_name, date_of_birth, email, password, gender, id);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});
//create a server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});