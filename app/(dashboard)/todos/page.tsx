import { getTodos } from '@/actions/todos';
import { getSession } from '@/lib/session';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import LogoutButton from '@/components/LogoutButton';

export default async function TodosPage() {
  const [session, todos] = await Promise.all([getSession(), getTodos()]);
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white text-sm font-semibold">F</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Flowlist</p>
              <p className="hidden font-mono text-xs text-[#8b949e] sm:block">personal / tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[260px] truncate text-sm text-[#8b949e] sm:block">{session?.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-12 items-center gap-6 text-sm">
            <span className="flex h-full items-center border-b-2 border-[#8dd6ff] font-semibold text-white">Tasks <span className="ml-2 rounded-full bg-[#21262d] px-2 py-0.5 text-xs text-[#8b949e]">{todos.length}</span></span>
            <span className="text-[#8b949e]">Open {active}</span>
            <span className="text-[#8b949e]">Completed {completed}</span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 font-mono text-xs tracking-[.5px] text-[#8b949e]">~/flowlist</p>
          <h1 className="text-[32px] font-normal leading-tight tracking-tight sm:text-[40px]">Tasks</h1>
          <p className="mt-3 text-base text-[#8b949e]">A focused place to track work, ideas, and the next thing worth finishing.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start">
          <aside className="gh-panel gh-card-shadow p-4 sm:p-5">
            <div className="mb-5">
              <p className="text-sm font-semibold">Create a task</p>
              <p className="mt-1 text-sm text-[#8b949e]">Add a concise, actionable item.</p>
            </div>
            <TodoForm />
          </aside>

          <section className="gh-panel overflow-hidden">
            <TodoList todos={todos} />
          </section>
        </div>
      </section>
    </main>
  );
}
