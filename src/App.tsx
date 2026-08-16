import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Input } from "./components/ui/input";
import type { Todo } from "./types/todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: true },
    { id: 3, text: "Read a book", completed: false },
  ]);
  const [input, setInput] = useState("");

  /**
   * BUG #1 (Wrong filter condition):
   *   `t.id === id` keeps only the item being deleted instead of removing it.
   *   Fix: change `t.id === id` → `t.id !== id`
   */
  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id === id));
  };

  /**
   * BUG #2 (Missing negation on toggle):
   *   `completed: todo.completed` sets the same value — nothing changes.
   *   Fix: change `todo.completed` → `!todo.completed`
   */
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: todo.completed } : todo
      )
    );
  };

  const handleAdd = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    /**
     * BUG #3 (Input not cleared after adding):
     *   After adding a todo the text field retains its value.
     *   Fix: add `setInput("");` here.
     */
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  /**
   * BUG #4 (Wrong completed count):
   *   `todos.length` always equals total items, not the number completed.
   *   Fix: change to `todos.filter((t) => t.completed).length`
   */
  const completedCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {completedCount} / {todos.length} completed
          </p>
        </div>

        {/* Add todo row */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>

        {/* Todo list */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">
            All done! Add a new task above.
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggle(todo.id)}
                />
                <span
                  className={`flex-1 text-sm transition-colors ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(todo.id)}
                  aria-label="Delete todo"
                >
                  <Trash2 size={15} />
                </Button>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {todos.filter((t) => !t.completed).length} remaining
            </span>
            <Button
              variant="ghost"
              className="text-xs h-7 px-2"
              onClick={() => setTodos(todos.filter((t) => !t.completed))}
            >
              Clear completed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
