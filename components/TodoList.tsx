import TodoItem from './TodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No todos yet. Add one above!
      </div>
    );
  }

  const pending = todos.filter(t => !t.completed);
  const done = todos.filter(t => t.completed);

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <section>
          <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Pending ({pending.length})
          </h2>
          <ul className="space-y-2">
            {pending.map(todo => <TodoItem key={todo.id} todo={todo} />)}
          </ul>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Completed ({done.length})
          </h2>
          <ul className="space-y-2 opacity-60">
            {done.map(todo => <TodoItem key={todo.id} todo={todo} />)}
          </ul>
        </section>
      )}
    </div>
  );
}
