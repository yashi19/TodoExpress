const route = require("express").Router();
/**
 * Each todo would be of type
 * {task:'Some task',done:true}
 */
let todos = [{ task: "First task", done: false }];

route.get("/", (req, res) => {
  res.json(
    todos.map((t, i) => ({
      id: i,
      task: t.task,
      done: t.done
    }))
  );
});

route.post("/", (req, res) => {
  if (typeof req.body.done === "string") {
    req.body.done = req.body.done === "true";
  }
  let newTodo = {
    task: req.body.task,
    done: req.body.done
  };

  todos.push(newTodo);
  res.json({
    success: true,
    id: todos.length - 1
  });
});

route.get("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var getTodo = todos[id];

  res.json({
    id: id,
    task: getTodo.task,
    done: getTodo.done
  });
});

route.put("/:id", (req, res) => {
  let id = req.params.id;

  if (typeof req.body.done === "string")
    req.body.done = req.body.done === "true";

  todos[id].done = req.body.done;
  res.json({
    id: id,
    task: todos[id].task,
    done: todos[id].done
  });
});

route.delete("/:id", (req, res) => {
  todos.splice(req.params.id, 1);
  res.json({
    sucess: true,
    length: todos.length
  });
});

route.delete("/", (req, res) => {
  let length = todos.length;
  for (let id = 0; id < length; id++) {
    let todo = todos[id];
    if (todo === undefined) break;

    if (todo.done === true) {
      todos.splice(id, 1);
      id--;
    }
  }

  res.json({
    success: true,
    length: todos.length
  });
});

module.exports = route;
