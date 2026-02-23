import { getTodos, type Todo } from '@/actions/todos';
import { getSession } from '@/lib/session';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import LogoutButton from '@/components/LogoutButton';

export default async function TodosPage() {
  const [session, todos] = await Promise.all([getSession(), getTodos()]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">My Todos</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{session?.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <TodoForm />
        <div className="mt-6">
          <TodoList todos={todos} />
        </div>
      </main>
    </div>
  );
}
