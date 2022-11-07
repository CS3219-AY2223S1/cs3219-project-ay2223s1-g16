import bcrypt from "bcrypt";

import {
  createUser,
  isUserExist,
  getUser,
  deleteUser,
  changePassword,
  addToHistory,
} from "./repository.js";

import jwtPackage from "jsonwebtoken";
const { sign } = jwtPackage;

const SALT_ROUNDS = 8;

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormGetUser(username) {
  try {
    const user = await getUser(username);
    return user;
  } catch (err) {
    console.log("ERROR: Could not find user");
    return { err };
  }
}

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
    console.log(`ERROR: Failed to retrieve user.`);
    return { err };
  }
}

export async function ormDeleteUser(username) {
  try {
    const { deletedCount } = await deleteUser(username);
    return { success: true, message: `Deleted ${username} user` };
  } catch (err) {
    console.log(`ERROR: Failed to delete user.`);
    return { err };
  }
}

export async function ormChangePassword(username, oldPassword, password) {
  try {
    const findUser = await getUser(username);
    if (findUser === null) {
      return { success: false, message: "Username does not exist" };
    }
    const isPasswordEqual = await bcrypt.compare(
      oldPassword,
      findUser.password
    );

    if (isPasswordEqual) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const { acknowledged } = await changePassword(username, hashedPassword);
      if (acknowledged) {
        return {
          success: true,
          status: 200,
          message: "Successfully updated password",
        };
      } else {
        return {
          success: false,
          status: 500,
          message: "Failed to update password",
        };
      }
    } else {
      return { success: false, status: 401, message: "Incorrect password" };
    }
  } catch (err) {
    console.log(`ERROR: Failed to update user password.`);
    return { err };
  }
}

export async function ormAddQuestionToUserHistory(username, question) {
  try {
    await addToHistory(username, question);
  } catch (err) {
    console.log("Failed to add question to user's history");
    return { err };
  }
}
