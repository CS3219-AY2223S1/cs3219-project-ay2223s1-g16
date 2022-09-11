import bcrypt from "bcrypt";

import { createUser, isUserExist, getUser } from "./repository.js";

import jwtPackage from "jsonwebtoken";
const { sign } = jwtPackage;

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
    if (result === null) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.log("ERROR: Could not check that user exists");
    return { err };
  }
}

export async function ormLoginUser(username, password) {
  try {
    const findUser = await getUser(username);
    if (findUser === null) {
      return { success: false, message: "Username does not exist" };
    }
    const isPasswordEqual = await bcrypt.compare(password, findUser.password);
    if (isPasswordEqual) {
      const token = sign(findUser.toObject(), process.env.JWT_KEY);
      return {
        success: true,
        token: token,
        userId: findUser._id,
        username: findUser.username,
      };
    }
    return { success: false, message: "Password is incorrect" };
  } catch (err) {
    console.log(`ERROR: Failed to retrieve user.\n${err}`);
    return { err };
  }
}
