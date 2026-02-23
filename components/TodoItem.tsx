'use client';

import { useState } from 'react';
import { type Todo, toggleTodo, deleteTodo, updateTodoTitle } from '@/actions/todos';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    await toggleTodo(todo.id);
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await deleteTodo(todo.id);
    setLoading(false);
  }

  async function handleEdit() {
    if (!editing) { setEditing(true); return; }
    if (title.trim() === todo.title) { setEditing(false); return; }
    setLoading(true);
    await updateTodoTitle(todo.id, title);
    setEditing(false);
    setLoading(false);
  }

  return (
    <li className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={loading}
        className="w-4 h-4 accent-black cursor-pointer"
      />
      {editing ? (
        <input
          className="flex-1 text-sm border-b border-gray-400 outline-none bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.title}
        </span>
      )}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          disabled={loading}
          className="text-xs text-blue-500 hover:text-blue-700 disabled:opacity-50"
        >
          {editing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          Del
        </button>
      </div>
    </li>
  );
}
