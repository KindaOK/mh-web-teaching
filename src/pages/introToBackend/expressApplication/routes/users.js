var express = require("express");
var router = express.Router();

function requireLogin(req, res, next) {
  if (req.cookies.username) {
    req.username = req.cookies.username;
    next()
  } else {
    res.status(403);
    res.send("Access denied. Try logging in");
  }
}

router.post("/login/", function(req, res, next) {
  const {db} = req.app.locals;
  const {username, password} = req.query;
  if (!username || !password) {
    return res.status(403);
  }
  db.get(`SELECT password FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(row);
    if (row?.password === password) {
      res.cookie("username", username, { maxAge: 7*60*60*1000, httpOnly: false });
      res.json({success: true});
    } else {
      res.status(404);
      res.json({success: false});
    }
  })
});

router.post("/create/", function(req, res, next) {
  const {db} = req.app.locals;
  const {username, password} = req.query;
  if (!username || !password) {
    return res.status(401);
  }
  db.run("INSERT INTO users(username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`User ${username} added`);
    res.status(201);
    res.json({created: this.changes})
  })
});

router.get("/self/", requireLogin, function(req, res, next) {
  return res.json({username: req.username, message: `Hi ${req.username}!`})
});

router.get("/all/", requireLogin, function(req, res, next) {
  const {db} = req.app.locals;
  db.all("SELECT username, id FROM users", [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(rows);
    if (rows) {
      res.render("all", {rows});
    } else {
      res.render("all", {rows: []});
    }
  })
});

router.get("/:username/", function(req, res, next) {
  const {db} = req.app.locals;
  const {username} = req.params;
  db.get("SELECT id FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (row) {
      res.json({id: row.id, username})
    } else {
      res.status(404)
      res.json({error: "User Not Found", username})
    }
  })
})

/* GET users listing. */
router.get("/:name/", function (req, res, next) {
  const name = req.params.name ?? "blank";
  res.json({ key: "value", number: 1, name: name });
});

// the more specific route will run if possible
router.get("/Someone/", function (req, res, next) {
  res.json({ name: "Someone", id: 1 });
});

module.exports = router;
