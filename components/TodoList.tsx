'use client';
import { useMemo,useState } from 'react';
import { type Todo } from '@/actions/todos';
import TodoItem from './TodoItem';
import { GooeyNav } from '@/components/ui/gooey-nav';
import { AnimatedCounter } from '@/components/ui/animated-counter';

type Filter='all'|'active'|'completed';
export default function TodoList({todos}:{todos:Todo[]}){
 const [filter,setFilter]=useState<Filter>('all');
 const active=todos.filter(t=>!t.completed).length; const completed=todos.length-active;
 const filtered=useMemo(()=>filter==='active'?todos.filter(t=>!t.completed):filter==='completed'?todos.filter(t=>t.completed):todos,[filter,todos]);
 const idx=filter==='all'?0:filter==='active'?1:2;
 return <div>
  <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-zinc-400">Your list</p><div className="mt-1 flex items-baseline gap-2"><AnimatedCounter value={todos.length} className="text-2xl font-black"/><span className="text-xs text-zinc-400">total tasks</span></div></div><GooeyNav value={idx} onChange={i=>setFilter(i===0?'all':i===1?'active':'completed')} items={[{label:'All',count:todos.length},{label:'Open',count:active},{label:'Done',count:completed}]}/></div>
  {filtered.length===0?<div className="rounded-3xl border border-dashed border-zinc-200 px-6 py-16 text-center dark:border-zinc-800"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-zinc-100 text-xl dark:bg-zinc-900">✦</div><p className="mt-5 font-bold">Nothing here.</p><p className="mt-1 text-sm text-zinc-400">{todos.length?'Try another view.':'Add a task and make the first move.'}</p></div>:<ul className="space-y-2">{filtered.map(todo=><TodoItem key={todo.id} todo={todo}/>)}</ul>}
 </div>;
}