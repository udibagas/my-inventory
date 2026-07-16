var express = require("express");
var router = express.Router();

const { Building, Room } = require("../models");

router.get("/", async (req, res) => {
  const buildings = await Building.findAll({
    order: [["name", "asc"]],
    include: Room, // eager loading
  });

  res.render("buildings/index", { buildings });
});

router.get("/create", async (req, res) => {
  res.render("buildings/create");
});

router.post("/create", async (req, res) => {
  const { code, name, description } = req.body;
  await Building.create({ code, name, description });
  res.redirect("/buildings");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const building = await Building.findByPk(id);
  res.render("buildings/show", { building });
});

router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Building.destroy({
    where: {
      id,
    },
  });

  res.redirect("/buildings");
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const building = await Building.findByPk(id);
  res.render("buildings/edit", { building });
});

router.post("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { code, name, description } = req.body;

  await Building.update(
    { code, name, description },
    {
      where: {
        id: id,
      },
    },
  );

  res.redirect("/buildings");
});

module.exports = router;
