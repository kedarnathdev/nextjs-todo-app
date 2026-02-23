import { type Todo } from '@/actions/todos';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No todos yet.</p>
        <p className="text-sm mt-1">Add one above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
