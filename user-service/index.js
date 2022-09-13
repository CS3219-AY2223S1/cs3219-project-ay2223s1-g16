import express from "express";
import cors from "cors";
import expressJwtPackage from "express-jwt";

const { expressjwt } = expressJwtPackage;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
// app.use(
//   expressjwt({ secret: process.env.JWT_KEY, algorithms: ["HS256"] }).unless({
//     path: ["/", "/api/user/login", "/api/user/"],
//   })
// );

import {
  createUser,
  loginUser,
  deleteUser,
  changePassword,
} from "./controller/user-controller.js";

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => res.send("Hello World from user-service"));
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/delete", deleteUser);
router.post("/password", changePassword);

app.use("/api/user", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(8000, () => console.log("user-service listening on port 8000"));
