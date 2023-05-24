const express = require("express");
const userRouter = express.Router();
const User = require("../db");

// get all users
userRouter.get("/", async (_, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get user by id
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// create user
userRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// update user
userRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.update(req.body, { where: { id } });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({ where: { id } });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = userRouter;
