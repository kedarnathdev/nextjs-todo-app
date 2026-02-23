'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';
import { todoSchema } from '@/lib/validations';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}

export async function getTodos(): Promise<Todo[]> {
  const session = await requireSession();
  const result = await sql<Todo>`
    SELECT id, title, completed, created_at, updated_at
    FROM todos
    WHERE user_id = ${session.userId}
    ORDER BY created_at DESC
  `;
  return result.rows as Todo[];
}

export async function createTodo(formData: FormData) {
  const session = await requireSession();
  const parsed = todoSchema.safeParse({ title: formData.get('title') });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await sql`
    INSERT INTO todos (user_id, title)
    VALUES (${session.userId}, ${parsed.data.title})
  `;

  revalidatePath('/todos');
  return { success: true };
}

export async function toggleTodo(id: number) {
  const session = await requireSession();
  await sql`
    UPDATE todos
    SET completed = NOT completed, updated_at = NOW()
    WHERE id = ${id} AND user_id = ${session.userId}
  `;
  revalidatePath('/todos');
}

export async function deleteTodo(id: number) {
  const session = await requireSession();
  await sql`
    DELETE FROM todos
    WHERE id = ${id} AND user_id = ${session.userId}
  `;
  revalidatePath('/todos');
}

export async function updateTodoTitle(id: number, title: string) {
  const session = await requireSession();
  const parsed = todoSchema.safeParse({ title });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await sql`
    UPDATE todos
    SET title = ${parsed.data.title}, updated_at = NOW()
    WHERE id = ${id} AND user_id = ${session.userId}
  `;

  revalidatePath('/todos');
  return { success: true };
}
