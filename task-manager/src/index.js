const express = require("express");
require("./db/mongoose");
const User = require("./models/user.model");
const Task = require("./models/task.model");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
// delete a task by an id and after that fetch uncompleted task

app.delete("/tasks/:id", (req, res) => {
  try {
    Task.findByIdAndDelete(req.params.id)
      .then(() => {
        return Task.find({ completed: false });
      })
      .then((tasks) => {
        return res.status(201).send(tasks);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (er) {
    return res.status(404).send(err);
  }
});

// get all tasks
app.get("/tasks", (req, res) => {
  try {
    Task.find({})
      .then((tasks) => {
        return res.status(200).send(tasks);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});
// get a single task
app.get("/tasks/:id", (req, res) => {
  try {
    Task.findById(req.params.id).then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      return res.status(200).send(task);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});
// create a task

app.post("/tasks", (req, res) => {
  try {
    const task = new Task(req.body);
    task
      .save()
      .then(() => {
        return res.status(201).send(task);
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});
// get all users list
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});
// get a single user
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});
// get all users
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// listing on the port
app.listen(port, () => {
  console.log("server on the port ", port);
});
