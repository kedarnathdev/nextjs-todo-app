'use client';

import { useMemo, useState } from 'react';
import { type Todo } from '@/actions/todos';
import TodoItem from './TodoItem';

interface TodoListProps { todos: Todo[]; }
type Filter = 'all' | 'active' | 'completed';

export default function TodoList({ todos }: TodoListProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const active = todos.filter((todo) => !todo.completed).length;
  const completed = todos.length - active;
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed);
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    return todos;
  }, [filter, todos]);

  const filters: Array<{ id: Filter; label: string; count: number }> = [
    { id: 'all', label: 'All', count: todos.length },
    { id: 'active', label: 'To do', count: active },
    { id: 'completed', label: 'Done', count: completed },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
          {filters.map((item) => (
            <button key={item.id} type="button" onClick={() => setFilter(item.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === item.id ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-200'}`}>
              {item.label}<span className="ml-1.5 text-gray-400 dark:text-zinc-600">{item.count}</span>
            </button>
          ))}
        </div>
        <span className="hidden text-xs text-gray-400 dark:text-zinc-500 sm:block">{completed} completed</span>
      </div>

      {todos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-2xl dark:bg-indigo-500/10">✦</div>
          <p className="font-semibold text-gray-800 dark:text-zinc-200">Your list is clear</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">Add your first task above and make today count.</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-500 dark:border-zinc-800 dark:text-zinc-500">Nothing in this view yet.</div>
      ) : (
        <ul className="space-y-2.5">{filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</ul>
      )}
    </div>
  );
}
