import { getTodos } from '@/actions/todos';
import { getSession } from '@/lib/session';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import LogoutButton from '@/components/LogoutButton';
import ThemeToggle from '@/components/ThemeToggle';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { StepPlayer } from '@/components/ui/step-player';

export default async function TodosPage() {
  const [session, todos] = await Promise.all([getSession(), getTodos()]);
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;
  const firstName = session?.email?.split('@')[0] ?? 'there';

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-zinc-950 dark:bg-[#09090b] dark:text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-[#f4f4f5]/85 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-[#09090b]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-950 text-sm font-black text-white dark:bg-white dark:text-zinc-950">F</div><div><p className="text-sm font-bold">Flowlist</p><p className="text-[11px] text-zinc-400">focus / finish / repeat</p></div></div>
          <div className="flex items-center gap-2"><ThemeToggle/><div className="hidden text-right sm:block"><p className="text-xs font-semibold">{session?.email}</p><p className="text-[11px] text-zinc-400">personal workspace</p></div><LogoutButton/></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="mb-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-zinc-400">Your command center</p><h1 className="text-4xl font-black tracking-[-.04em] sm:text-6xl">Make space for<br/><span className="text-zinc-400">what matters.</span></h1><p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">Good to see you, {firstName}. Turn loose thoughts into small, finishable actions.</p></div>
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,.06)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
            <div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Momentum</p><p className="mt-1 text-sm text-zinc-500">{completed} completed today</p></div><AnimatedCounter value={completed} className="text-5xl font-black tracking-[-.06em]"/></div>
            <StepPlayer steps={Math.max(todos.length,1)} value={completed}/>
            <div className="mt-4 flex justify-between text-[11px] font-semibold text-zinc-400"><span>{active} remaining</span><span>{todos.length ? Math.round((completed/todos.length)*100) : 0}% complete</span></div>
          </div>
        </section>
        <section className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="rounded-[28px] bg-zinc-950 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,.12)] dark:bg-white dark:text-zinc-950 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.2em] opacity-40">Capture</p><h2 className="mt-3 text-2xl font-black tracking-tight">What needs your attention?</h2><p className="mt-2 text-sm leading-6 opacity-55">One task at a time. Keep the list honest.</p><div className="mt-7"><TodoForm/></div></div>
          <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,.05)] dark:border-zinc-800 dark:bg-zinc-950 sm:p-7"><TodoList todos={todos}/></div>
        </section>
      </main>
    </div>
  );
}