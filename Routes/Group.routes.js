const express = require("express");
const groupRouter = express.Router();
const Group = require("../db");

// get all groups for a user
groupRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id;i
    const groups = await Group.findAll({ where: { userId } });
    res.status(200).json(groups);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// get a single group
groupRouter.get("/:id", async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findByPk(groupId);
    res.status(200).json(group);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// create a new group
groupRouter.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const group = await Group.create({ name, userId });
    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = groupRouter;
