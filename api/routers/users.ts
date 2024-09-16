import express from "express";
import User from "../models/User";
import { Error } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: crypto.randomUUID(),
    });

    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({ error: "Password is wrong" });
  }

  user.token = crypto.randomUUID();
  await user.save();

  return res.send({ message: "Username and password correct!", user });
});


usersRouter.delete("/sessions", async (req, res, next) => {
  try {
    const headerValue = req.get("Authorization");
    const successMessage = { message: "Success!" };

    if (!headerValue) {
      return res.send({ ...successMessage, stage: "No header" });
    }

    const [_bearer, token] = headerValue.split(" ");

    if (!token) {
      return res.send({ ...successMessage, stage: "No token" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ ...successMessage, stage: "No user" });
    }

    user.generateToken();
    await user.save();

    return res.send({ ...successMessage, stage: "Success" });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
