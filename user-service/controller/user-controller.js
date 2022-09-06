import {
  ormCreateUser as _createUser,
  ormIsUserExist as _checkUserExist,
} from "../model/user-orm.js";

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const isUserExist = await _checkUserExist(username);

      if (isUserExist.err) {
        return res
          .status(500)
          .json({ message: "Database failure when creating new user!" });
      }

      if (isUserExist) {
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
