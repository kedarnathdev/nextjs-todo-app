'use client';

import { useState, useTransition } from 'react';
import { toggleTodo, deleteTodo, updateTodoTitle } from '@/actions/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  function handleToggle() {
    startTransition(() => toggleTodo(todo.id));
  }

  function handleDelete() {
    startTransition(() => deleteTodo(todo.id));
  }

  function handleEdit() {
    if (!editing) return setEditing(true);
    startTransition(async () => {
      await updateTodoTitle(todo.id, editValue);
      setEditing(false);
    });
  }

  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isPending}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />

      {editing ? (
        <input
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleEdit()}
          autoFocus
          className="flex-1 px-2 py-0.5 border border-blue-400 rounded focus:outline-none"
        />
      ) : (
        <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.title}
        </span>
      )}

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleEdit} disabled={isPending}
          className="text-xs px-2 py-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
          {editing ? 'Save' : 'Edit'}
        </button>
        {editing && (
          <button onClick={() => setEditing(false)}
            className="text-xs px-2 py-1 text-gray-500 hover:bg-gray-50 rounded">
            Cancel
          </button>
        )}
        <button onClick={handleDelete} disabled={isPending}
          className="text-xs px-2 py-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
          Delete
        </button>
      </div>
    </li>
  );
}
