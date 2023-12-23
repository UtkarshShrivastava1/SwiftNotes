const router = require("express").Router();

router.get("/", (req, res) => {
  const obj = {
    a: "this",
    number: 34,
  };
  res.json(obj);
});

module.exports = router;
