import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/ToDoContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { Sun, Moon, LogOut, Plus, Filter, Calendar, Tag, Zap, CheckCircle, XCircle, AlertCircle, Rocket, CheckSquare, Target } from "lucide-react";

export default function Dashboard() {
  const { todos, addTodo, updateTodo, deleteTodo, loading, error } = useContext(TodoContext);
  const { logout } = useContext(AuthContext);

  const [dark, setDark] = useState(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) return saved === "true";
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [themeFading, setThemeFading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });


  // Apply dark mode to document
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Calculate stats
  useEffect(() => {
    setStats({
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length
    });
  }, [todos]);

  // Filter todos
  useEffect(() => {
    if (filter === "All") setFilteredTodos(todos);
    else if (filter === "Completed") setFilteredTodos(todos.filter((t) => t.completed));
    else if (filter === "Pending") setFilteredTodos(todos.filter((t) => !t.completed));
    else setFilteredTodos(todos.filter((t) => t.priority === filter));
  }, [todos, filter]);

  const handleAdd = () => {
    if (!title) return;
    addTodo({
      title,
      description,
      priority,
      dueDate,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    });
    setTitle(""); setDescription(""); setPriority("Low"); setDueDate(""); setTags("");
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "bg-linear-to-r from-red-500 to-pink-600";
      case "Medium": return "bg-linear-to-r from-yellow-500 to-orange-500";
      case "Low": return "bg-linear-to-r from-green-500 to-emerald-600";
      default: return "bg-linear-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden theme-transition bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="mx-auto max-w-7xl p-3 sm:p-4 md:p-6">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TODO DASH
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider">AI-Powered Task Management</p>
            </div>
          </div>
        </div>

        {/* Control Panel - Responsive */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-normal">
          {/* Fixed Dark Mode Toggle */}
         {/* Dark Mode Toggle – PERFECT VERSION */}
<div className="relative flex items-center justify-center">
  <button
    onClick={() => {
  setThemeFading(true);
  setTimeout(() => {
    setDark(!dark);
    setTimeout(() => setThemeFading(false), 250);
  }, 150);
}}

    className="group relative w-20 h-10 sm:w-24 sm:h-12 rounded-full
               bg-linear-to-r from-gray-800 to-gray-900
               dark:from-gray-200 dark:to-gray-300
               shadow-xl hover:shadow-2xl
               transition-all duration-300 hover:scale-105 active:scale-95"
    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
  >
    {/* Track */}
    <div
      className="absolute inset-1.5 rounded-full
                 bg-linear-to-r from-gray-900 to-gray-800
                 dark:from-gray-100 dark:to-gray-300 overflow-hidden"
    >
      {/* Handle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2
                    left-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full
                    shadow-lg transition-transform duration-300 ease-out
                    ${dark ? "translate-x-9 sm:translate-x-11" : "translate-x-0"}
                    bg-linear-to-br from-white to-gray-200
                    dark:from-gray-800 dark:to-gray-900`}
      >
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun
            className={`absolute h-4 w-4 sm:h-5 sm:w-5 text-yellow-500
              transition-all duration-300
              ${dark ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
          />
          <Moon
            className={`absolute h-4 w-4 sm:h-5 sm:w-5 text-slate-200
              drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]
              transition-all duration-300
              ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
          />
        </div>
      </div>
    </div>
  </button>

  {/* Tooltip */}
  <div
    className="absolute -bottom-9 left-1/2 -translate-x-1/2
               whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-lg
               bg-gray-900/90 dark:bg-gray-100/90
               text-white dark:text-gray-900
               opacity-0 group-hover:opacity-100 transition-opacity duration-300
               pointer-events-none z-50"
  >
    {dark ? "Light Mode" : "Dark Mode"}
  </div>
</div>
          {/* Logout Button - Responsive */}
          <button
            onClick={logout}
            className="group relative px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-linear-to-r from-red-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Logout</span>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Add Task Form */}
        <div className="lg:col-span-2">
          {/* Add Task Form - Responsive */}
          <div className="bg-linear-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl sm:shadow-2xl mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Create New Task
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 ">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-600 dark:text-gray-400">Task Title *</label>
                  <input
                    className="w-full p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-600 dark:text-gray-400">Priority Level</label>
                  <div className="relative">
                    <select
                      className="w-full p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 appearance-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-gray-900 dark:text-gray-100"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${priority === "High" ? "bg-red-500" : priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-600 dark:text-gray-400">Description</label>
                  <input
                    className="w-full p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-600 dark:text-gray-400">Due Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-gray-900 dark:text-gray-100"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                    <Calendar className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-gray-600 dark:text-gray-400">Tags</label>
                <div className="relative">
                  <input
                    className="w-full p-3 sm:p-4 pl-10 sm:pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Add tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <Tag className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <button
              className="group relative w-full px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden text-sm sm:text-base"
              onClick={handleAdd}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                Add New Task
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Todo List Section */}
          <div>
            {/* Filter Bar - Responsive */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-2 mb-2 sm:mb-0 sm:mr-4">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">FILTERS:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Completed", "Pending", "Low", "Medium", "High"].map((f) => (
                  <button
                    key={f}
                    className={`group px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      filter === f
                        ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105"
                    }`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                    {filter === f && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading & Error States */}
            {loading && (
              <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3 sm:mb-4"></div>
                <p className="text-base sm:text-lg font-semibold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Loading Tasks...</p>
              </div>
            )}

            {error && (
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800/50 mb-4 sm:mb-6">
                <p className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  {error}
                </p>
              </div>
            )}

            {/* Task Cards Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {filteredTodos.map((todo) => (
                <div
                  key={todo._id}
                  className={`group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:hover:shadow-2xl ${
                    todo.completed 
                      ? "bg-linear-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200/50 dark:border-emerald-800/50" 
                      : "bg-linear-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border-gray-200/50 dark:border-gray-700/50"
                  }`}
                >
                  {/* Priority Indicator */}
                  <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse ${todo.priority === "High" ? "bg-red-500" : todo.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}></div>
                  
                  <div className="mb-3 sm:mb-4 pr-6 sm:pr-8">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-lg sm:text-xl font-bold ${todo.completed ? "line-through text-gray-400 dark:text-gray-500" : ""}`}>
                        {todo.title}
                      </h3>
                    </div>
                    
                    {todo.description && (
                      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {todo.description}
                      </p>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold text-white ${getPriorityColor(todo.priority)}`}>
                        {todo.priority} PRIORITY
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No deadline"}
                      </div>
                    </div>

                    {todo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {todo.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 sm:px-3 sm:py-1 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons - Responsive */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      className={`group relative flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 overflow-hidden text-xs sm:text-sm ${
                        todo.completed 
                          ? "bg-linear-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-500/30" 
                          : "bg-linear-to-r from-emerald-500 to-green-500 hover:shadow-lg hover:shadow-emerald-500/30"
                      }`}
                      onClick={() => updateTodo(todo._id, { completed: !todo.completed })}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                        {todo.completed ? (
                          <>
                            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Reactivate</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Complete</span>
                          </>
                        )}
                      </span>
                    </button>
                    
                    <button
                      className="group relative px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-red-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 overflow-hidden text-xs sm:text-sm"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Delete</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTodos.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mt-4 sm:mt-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent text-center">
                  No Tasks Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md text-sm sm:text-base">
                  No tasks match your current filter. Create a new task or try different filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Quick Stats - Responsive */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 sm:top-6 space-y-4 sm:space-y-6">
            {/* Active Tasks */}
            <div className="bg-linear-to-br from-white/90 to-purple-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl sm:shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Active Tasks
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {todos.filter(t => !t.completed).slice(0, 3).map((todo) => (
                  <div key={todo._id} className="p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold truncate text-sm sm:text-base">{todo.title}</span>
                      <div className={`w-2 h-2 rounded-full ${todo.priority === "High" ? "bg-red-500" : todo.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}></div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No deadline"}
                    </div>
                  </div>
                ))}
                {todos.filter(t => !t.completed).length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                    No active tasks
                  </div>
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-linear-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl sm:shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Performance Metrics
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
                      style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10">
                    <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {stats.total}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">Total</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-linear-to-br from-emerald-500/10 to-green-500/10">
                    <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                      {stats.completed}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">Done</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl bg-linear-to-br from-amber-500/10 to-orange-500/10">
                    <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                      {stats.pending}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}