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
      <form ref={ref} action={handleSubmit} className="flex gap-2">
        <input
          name="title"
          type="text"
          placeholder="Add a new todo..."
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium whitespace-nowrap"
        >
          {isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
