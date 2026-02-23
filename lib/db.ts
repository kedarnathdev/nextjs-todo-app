import { sql } from '@vercel/postgres';

export { sql };

export async function runMigrations() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      email      VARCHAR(255) UNIQUE NOT NULL,
      password   VARCHAR(255) NOT NULL,
      name       VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title      VARCHAR(500) NOT NULL,
      completed  BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id)
  `;

  console.log('Migrations complete.');
}
