'use client';
import { useMemo, useState } from 'react';
import { type Todo } from '@/actions/todos';
import TodoItem from './TodoItem';

type Filter = 'all' | 'active' | 'completed';

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const active = todos.filter((todo) => !todo.completed).length;
  const completed = todos.length - active;
  const filtered = useMemo(
    () => filter === 'active' ? todos.filter((todo) => !todo.completed) : filter === 'completed' ? todos.filter((todo) => todo.completed) : todos,
    [filter, todos],
  );

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All tasks', count: todos.length },
    { id: 'active', label: 'Open', count: active },
    { id: 'completed', label: 'Completed', count: completed },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-[#30363d] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="text-[22px] font-normal leading-7">Task list</h2>
          <p className="mt-1 font-mono text-xs text-[#8b949e]">{filtered.length} matching records</p>
        </div>
        <div className="flex flex-wrap gap-1 rounded-md border border-[#30363d] bg-[#0d1117] p-1" role="tablist" aria-label="Task filters">
          {filters.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)} className={`min-h-9 rounded px-3 text-sm transition duration-100 ${filter === item.id ? 'bg-[#21262d] font-semibold text-white' : 'text-[#8b949e] hover:text-white'}`}>
              {item.label} <span className="ml-1 font-mono text-xs opacity-70">{item.count}</span>
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="font-mono text-sm text-[#8b949e]">No matching tasks.</p>
          <p className="mt-2 text-sm text-[#8b949e]">{todos.length ? 'Try another filter.' : 'Create your first task to get started.'}</p>
        </div>
      ) : (
        <ul>{filtered.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</ul>
      )}
    </div>
  );
}
