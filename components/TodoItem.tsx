'use client';

import { useState } from 'react';
import { type Todo, toggleTodo, deleteTodo, updateTodoTitle } from '@/actions/todos';

interface TodoItemProps { todo: Todo; }

function IconButton({ label, onClick, children, disabled, danger = false }: { label: string; onClick: () => void; children: React.ReactNode; disabled: boolean; danger?: boolean }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled}
      className={`grid h-9 w-9 place-items-center rounded-lg border text-sm transition ${danger ? 'border-transparent text-gray-400 hover:border-red-100 hover:bg-red-50 hover:text-red-600 dark:text-zinc-600 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400' : 'border-transparent text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-700 dark:text-zinc-600 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'} disabled:cursor-not-allowed disabled:opacity-40`}
    >{children}</button>
  );
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  async function handleToggle() { setLoading(true); await toggleTodo(todo.id); setLoading(false); }
  async function handleDelete() { setLoading(true); await deleteTodo(todo.id); setLoading(false); }
  async function handleEdit() {
    if (!editing) { setEditing(true); return; }
    const nextTitle = title.trim();
    if (!nextTitle || nextTitle === todo.title) { setTitle(todo.title); setEditing(false); return; }
    setLoading(true);
    const result = await updateTodoTitle(todo.id, nextTitle);
    if (!result?.error) setEditing(false);
    setLoading(false);
  }

  return (
    <li className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition duration-200 ${todo.completed ? 'border-gray-100 bg-gray-50/80 dark:border-zinc-800 dark:bg-zinc-900/60' : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(17,24,39,0.06)] dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]'}`}>
      <button type="button" aria-label={todo.completed ? 'Mark task incomplete' : 'Mark task complete'} onClick={handleToggle} disabled={loading}
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${todo.completed ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-gray-300 bg-white hover:border-[var(--accent)] dark:border-zinc-700 dark:bg-zinc-900'}`}>
        {todo.completed && <span className="text-[10px] font-black text-white">✓</span>}
      </button>

      {editing ? (
        <input className="min-w-0 flex-1 rounded-lg border border-[var(--accent)] bg-white px-2 py-1.5 text-sm text-gray-900 outline-none ring-4 ring-indigo-50 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-indigo-500/10" value={title}
          onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleEdit(); if (e.key === 'Escape') { setTitle(todo.title); setEditing(false); } }} autoFocus />
      ) : (
        <span className={`min-w-0 flex-1 text-sm font-medium ${todo.completed ? 'text-gray-400 line-through dark:text-zinc-600' : 'text-gray-800 dark:text-zinc-200'}`}>{todo.title}</span>
      )}

      <div className="flex shrink-0 items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
        <IconButton label={editing ? 'Save task' : 'Edit task'} onClick={handleEdit} disabled={loading}>{editing ? '✓' : '✎'}</IconButton>
        <IconButton label="Delete task" onClick={handleDelete} disabled={loading} danger>×</IconButton>
      </div>
    </li>
  );
}
