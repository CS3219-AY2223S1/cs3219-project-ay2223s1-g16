import {
  ormGetUser as _getUser,
  ormCreateUser as _createUser,
  ormIsUserExist as _checkUserExist,
  ormLoginUser as _loginUser,
  ormDeleteUser as _deleteUser,
  ormChangePassword as _changePassword,
} from "../model/user-orm.js";

export async function getUserHistory(req, res) {
  try {
    const { username } = req.params;
    const user = await _getUser(username);
    return res.status(200).json({ history: user.history.reverse() });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when fetching user history." });
  }
}

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const isUserExist = await _checkUserExist(username);

      if (isUserExist.err) {
        return res.status(500).json({
          message: "Database failure when creating new user!",
        });
      }

      if (isUserExist.success) {
        return res.status(400).json({
          message:
            "Username already exists, please login or use a different username",
        });
      }

      const resp = await _createUser(username, password);
      if (resp.err) {
        return res
          .status(400)
          .json({ message: "Could not create a new user!" });
      } else {
        console.log(`Created new user ${username} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new user ${username} successfully!` });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Username and/or Password are missing!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new user!" });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const resp = await _loginUser(username, password);
    if (resp?.err) {
      return res
        .status(500)
        .json({ message: "Database failure when attempting to login!" });
    }
    if (resp.success) {
      const { token, userId } = resp;
      res.cookie("token", token, {
        httpOnly: true,
        domain: "http://127.0.0.1:5173/",
      });
      return res.json({ token, userId, username });
    } else {
      return res.status(401).json({ message: resp.message });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when attempting to login!" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { username } = req.body;
    const resp = await _deleteUser(username);
    if (resp?.err) {
      return res
        .status(500)
        .json({ message: "Database failure when attempting to delete user!" });
    }
    return res
      .status(200)
      .json({ message: `Deleted user ${username} successfully!` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when attempting to delete user!" });
  }
}

export async function changePassword(req, res) {
  try {
    const { username, oldPassword, password } = req.body;
    const resp = await _changePassword(username, oldPassword, password);

    if (resp?.err) {
      return res.status(500).json({
        message: "Database failure when attempting to update user password!",
      });
    }
    if (resp.success) {
      return res
        .status(200)
        .json({ message: `Updated user ${username} password successfully!` });
    } else {
      return res.status(resp.status).json({
        message: resp.message,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Database failure when attempting to update user password!",
    });
  }
}
