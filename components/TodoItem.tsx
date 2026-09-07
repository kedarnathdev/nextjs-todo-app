'use client';
import { useState } from 'react';
import { type Todo, toggleTodo, deleteTodo, updateTodoTitle } from '@/actions/todos';
import { motion, AnimatePresence } from 'motion/react';

export default function TodoItem({ todo }: { todo: Todo }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  async function toggle() { setLoading(true); await toggleTodo(todo.id); setLoading(false); }
  async function remove() { setLoading(true); await deleteTodo(todo.id); setLoading(false); }
  async function save() {
    const next = title.trim();
    if (!next || next === todo.title) { setTitle(todo.title); setEditing(false); return; }
    setLoading(true);
    const result = await updateTodoTitle(todo.id, next);
    if (!result?.error) setEditing(false);
    setLoading(false);
  }

  return (
    <motion.li layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, ease: [0.16,1,0.3,1] }} className="border-b border-[#30363d] last:border-b-0">
      <div className="flex min-h-[68px] items-center gap-3 px-4 py-3 sm:px-5">
        <button type="button" disabled={loading} onClick={toggle} aria-label={todo.completed ? 'Mark task incomplete' : 'Mark task complete'} aria-pressed={todo.completed} className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition duration-100 ${todo.completed ? 'border-[#8dd6ff] bg-[#8dd6ff] text-[#111111]' : 'border-[#8b949e] bg-transparent text-transparent hover:border-white'}`}>
          ✓
        </button>

        {editing ? (
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setTitle(todo.title); setEditing(false); } }} className="gh-input min-w-0 flex-1" aria-label="Edit task title" />
        ) : (
          <button type="button" onDoubleClick={() => setEditing(true)} className={`min-w-0 flex-1 text-left text-sm ${todo.completed ? 'text-[#8b949e] line-through' : 'text-white'}`}>
            {todo.title}
          </button>
        )}

        <div className="flex shrink-0 items-center gap-1">
          <button type="button" disabled={loading} onClick={() => editing ? save() : setEditing(true)} className="min-h-10 rounded-md px-3 text-sm text-[#8b949e] hover:bg-[#161b22] hover:text-white">{editing ? 'Save' : 'Edit'}</button>
          <button type="button" disabled={loading} onClick={remove} aria-label={`Delete task: ${todo.title}`} className="min-h-10 rounded-md px-3 text-sm text-[#8b949e] hover:bg-[#161b22] hover:text-[#ff7b72]">Delete</button>
        </div>
      </div>
    </motion.li>
  );
}
