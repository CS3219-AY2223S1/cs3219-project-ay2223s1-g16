import bcrypt from "bcrypt";

import { createUser, isUserExist } from "./repository.js";

const SALT_ROUNDS = 8;

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await createUser({ username, password: hashedPassword });
    newUser.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new user");
    return { err };
  }
}

export async function ormIsUserExist(username) {
  try {
    const result = await isUserExist(username);
    return result;
  } catch (err) {
    console.log("ERROR: Could not check that user exists");
    return { err };
  }
}
