import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get("/todos");
      setTodos(data);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post("/todos", todo);
      setTodos([data, ...todos]);
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, updated) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.put(`/todos/${id}`, updated);
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
};
