import { Todo } from "../models/Todo.js";

// Get all todos for logged-in user
export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
};

// Create a new todo
export const createTodo = async (req, res) => {
  const { title, description, priority, dueDate, tags } = req.body;

  const todo = await Todo.create({
    user: req.user._id,
    title,
    description,
    priority,
    dueDate,
    tags,
  });

  res.status(201).json(todo);
};

// Update a todo
export const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  Object.assign(todo, req.body);
  const updatedTodo = await todo.save();
  res.json(updatedTodo);
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // Make sure the logged-in user owns this todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Todo.findByIdAndDelete(req.params.id); // ✅ Correct
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

