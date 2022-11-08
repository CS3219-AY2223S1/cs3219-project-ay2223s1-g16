import express from "express";
import cors from "cors";
import expressJwtPackage from "express-jwt";

const { expressjwt } = expressJwtPackage;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
app.use(
  expressjwt({ secret: process.env.JWT_KEY, algorithms: ["HS256"] }).unless({
    path: ["/", "/login"],
  })
);

import {
  createUser,
  loginUser,
  deleteUser,
  changePassword,
  getUserHistory,
} from "./controller/user-controller.js";
import { startConsumer } from "./events/consumer.js";

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => res.send("Hello World from user-service"));
router.post("/", createUser);
router.get("/history/:username", getUserHistory);
router.post("/login", loginUser);
router.post("/delete", deleteUser);
router.post("/password", changePassword);

app.use("/", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(8000, () => console.log("user-service listening on port 8000"));

// Start kafka consumer
try {
  startConsumer();
} catch (err) {
  console.error(`Failed to start kafka consumer: ${err}`);
}
