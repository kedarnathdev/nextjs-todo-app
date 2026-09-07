'use client';
import { useRef, useState, useTransition } from 'react';
import { createTodo } from '@/actions/todos';

export default function TodoForm() {
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  function submit(fd: FormData) {
    startTransition(async () => {
      const result = await createTodo(fd);
      if (result?.error) setError(result.error);
      else { setError(''); ref.current?.reset(); }
    });
  }

  return (
    <form ref={ref} action={submit} className="space-y-3">
      <label htmlFor="todo-title" className="block text-xs font-semibold uppercase tracking-wide text-[#8b949e]">Task title</label>
      <input id="todo-title" name="title" required autoComplete="off" placeholder="e.g. Review deployment logs" className="gh-input w-full" />
      <button type="submit" disabled={pending} className="gh-primary-button w-full">{pending ? 'Creating…' : 'Create task'}</button>
      {error && <p role="alert" className="text-sm text-[#ff7b72]">{error}</p>}
    </form>
  );
}
