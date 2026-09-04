import { getTodos } from '@/actions/todos';
import { getSession } from '@/lib/session';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import LogoutButton from '@/components/LogoutButton';

export default async function TodosPage() {
  const [session, todos] = await Promise.all([getSession(), getTodos()]);
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;
  const firstName = session?.email?.split('@')[0] ?? 'there';

  return (
    <div className="app-shell">
      <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-950 text-sm font-black text-white shadow-sm">F</div>
            <div>
              <p className="text-sm font-bold tracking-tight text-gray-950">Flowlist</p>
              <p className="hidden text-[11px] text-gray-400 sm:block">Simple tasks. Clear mind.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-gray-700">{session?.email}</p>
              <p className="text-[11px] text-gray-400">Your workspace</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="eyebrow">Today’s focus</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Good to see you, {firstName}.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">Capture the little things, finish the important ones, and keep momentum without the clutter.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="panel px-4 py-4">
              <p className="text-xs font-medium text-gray-400">To do</p>
              <p className="mt-1 text-2xl font-bold text-gray-950">{active}</p>
            </div>
            <div className="panel px-4 py-4">
              <p className="text-xs font-medium text-gray-400">Done</p>
              <p className="mt-1 text-2xl font-bold text-gray-950">{completed}</p>
            </div>
          </div>
        </section>

        <section className="panel overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
            <p className="text-sm font-semibold text-gray-900">Add a task</p>
            <p className="mt-1 text-xs text-gray-400">Keep it short and actionable.</p>
            <div className="mt-4"><TodoForm /></div>
          </div>
          <div className="px-5 py-5 sm:px-7 sm:py-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Your tasks</p>
                <p className="mt-1 text-xs text-gray-400">{todos.length === 0 ? 'Nothing queued yet.' : `${todos.length} ${todos.length === 1 ? 'task' : 'tasks'} in your list`}</p>
              </div>
              {todos.length > 0 && <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${Math.round((completed / todos.length) * 100)}%` }} /></div>}
            </div>
            <TodoList todos={todos} />
          </div>
        </section>
      </main>
    </div>
  );
}
