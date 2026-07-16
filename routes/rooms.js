var express = require("express");
var router = express.Router();

const { Room, Building } = require("../models");

router.get("/", async (req, res) => {
  const rooms = await Room.findAll({
    order: [["name", "asc"]],
    include: Building,
  });

  res.render("rooms/index", { rooms });
});

router.get("/create", async (req, res) => {
  const buildings = await Building.findAll({
    attributes: ["id", "name"],
    order: [["name", "asc"]],
  });

  res.render("rooms/create", { buildings });
});

router.post("/create", async (req, res) => {
  const { code, name, description, BuildingId } = req.body;
  await Room.create({ code, name, description, BuildingId });
  res.redirect("/rooms");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByPk(id);
  res.render("rooms/show", { room });
});

router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Room.destroy({
    where: {
      id,
    },
  });

  res.redirect("/rooms");
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;

  const room = await Room.findByPk(id);

  const buildings = await Building.findAll({
    attributes: ["id", "name"],
    order: [["name", "asc"]],
  });

  res.render("rooms/edit", { room, buildings });
});

router.post("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { code, name, description, BuildingId } = req.body;

  await Room.update(
    { code, name, description, BuildingId },
    {
      where: {
        id: id,
      },
    },
  );

  res.redirect("/rooms");
});

module.exports = router;
