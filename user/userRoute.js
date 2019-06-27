const bcrypt = require("bcryptjs");
const Users = require("./userModel");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/accounts", authenticate, getAccounts);
  server.get("/api/classrooms/:id", authenticate, getClassroom);
  server.post("/api/classrooms/", authenticate, addClassroom);
};

function getAccounts(req, res) {
  Users.find()
    .then(users => {
      res.status(200).json(users);
      console.log(users);
    })
    .catch(err => console.log(err));
}

function getClassroom(req, res) {
  Users.findClassById(req.params.id)
    .then(users => {
      res.status(200).json(users);
      console.log(users);
    })
    .catch(err => console.log(err));
}

function addClassroom(req, res) {
  let user = req.body;
  Users.addClass(user)
    .then(classroom =>
      res.status(201).json({
        message: `${classroom.classroom} has been created`
      })
    )
    .catch(err => {
      res.status(500).json(err);
      // console.log(err);
    });
}

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(creds =>
      res.status(201).json({
        message: `${creds.username} has been created`,
        created_at: `${creds.created_at}`
      })
    )
    .catch(err => {
      res.status(500).json(err);
      // console.log(err);
    });
}

function login(req, res) {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res
          .status(200)
          .json({
            message: `Welcome ${(user.username, user.id)}, have a token`,
            token
          });
      } else {
        res.status(401).json({ message: "Invalid Creds Bro" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
      // console.log(err);
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "4h"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}
