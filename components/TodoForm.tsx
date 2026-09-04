'use client';

import { useRef, useState, useTransition } from 'react';
import { createTodo } from '@/actions/todos';

export default function TodoForm() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createTodo(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setError('');
        ref.current?.reset();
      }
    });
  }

  return (
    <div>
      <form ref={ref} action={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="todo-title">New task</label>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">＋</span>
          <input
            id="todo-title"
            name="title"
            type="text"
            placeholder="What needs to get done?"
            required
            autoComplete="off"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-10 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-strong)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Adding…' : 'Add task'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm font-medium text-red-600" role="alert">{error}</p>}
    </div>
  );
}
