'use client';
import { useState } from 'react';
import { type Todo,toggleTodo,deleteTodo,updateTodoTitle } from '@/actions/todos';
import { DeleteButton } from '@/components/ui/delete-button';
import { motion } from 'motion/react';
export default function TodoItem({todo}:{todo:Todo}){
 const [editing,setEditing]=useState(false); const [title,setTitle]=useState(todo.title); const [loading,setLoading]=useState(false);
 async function toggle(){setLoading(true);await toggleTodo(todo.id);setLoading(false)}
 async function remove(){setLoading(true);await deleteTodo(todo.id);setLoading(false)}
 async function save(){const next=title.trim();if(!next||next===todo.title){setTitle(todo.title);setEditing(false);return}setLoading(true);const r=await updateTodoTitle(todo.id,next);if(!r?.error)setEditing(false);setLoading(false)}
 return <motion.li layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/70 px-3 py-3 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
  <button type="button" onClick={toggle} disabled={loading} aria-label={todo.completed?'Mark incomplete':'Mark complete'} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${todo.completed?'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950':'border-zinc-300 bg-white text-transparent hover:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-white'}`}>✓</button>
  {editing?<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')save();if(e.key==='Escape'){setTitle(todo.title);setEditing(false)}}} className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-950"/>:<button type="button" onDoubleClick={()=>setEditing(true)} className={`min-w-0 flex-1 text-left text-sm font-semibold ${todo.completed?'text-zinc-400 line-through':'text-zinc-800 dark:text-zinc-200'}`}>{todo.title}</button>}
  <button type="button" onClick={()=>editing?save():setEditing(true)} disabled={loading} className="hidden rounded-full px-3 py-2 text-xs font-bold text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white sm:block">{editing?'Save':'Edit'}</button>
  <DeleteButton onConfirm={remove}/>
 </motion.li>;
}