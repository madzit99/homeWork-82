import express from "express";
import User from "../models/User";
import { Error } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import config from "../config";

const usersRouter = express.Router();

const googleCliend = new OAuth2Client(config.google.clientId);

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


usersRouter.post("/google", async (req, res, next) => {
  try{
    const ticket = await googleCliend.verifyIdToken({
     idToken: req.body.credential,
     audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: "Ошибка входа в Google!" });
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;

    if (!email) {
      return res
        .status(400)
        .send({
          error: "Недостаточно пользовательских данных для продолжения!",
        });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleId: id,
        displayName,
      });
    }

    user.generateToken();
    await user.save();
    return res.send(user);
  }catch (error) {
    next(error);
  }
})


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
