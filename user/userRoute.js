const router = require("express").Router();
const userModel = require("./userModel");

router.get("/", (req, res) => {
  userModel
    .find()
    .then(users => {
      res.status(200).json(users);
      console.log(users);
    })
    .catch(err => console.log(err));
}); //working

router.delete("/:id", (req, res) => {
  userModel
    .destroy(req.params.id)
    .then(deletedUser => {
      if (deletedUser > 0) {
        res.status(200).json({ "deleted users": deletedUser });
      } else {
        res.status(404).json({ error: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
      // console.log(err);
    });
}); //working

router.post("/", (req, res) => {
  userModel
    .add(req.body)
    .then(userAdded => res.status(200).json(userAdded))
    .catch(err => {
      res.status(500).json({ success: false, message: err });
      // console.log(err);
    });
}); //working

module.exports = router;
