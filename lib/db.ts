import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  idle_timeout: 20,
  max_lifetime: 1800,
  connect_timeout: 10,
});

export { sql };

export async function query(strings: TemplateStringsArray, ...values: unknown[]) {
  return sql(strings, ...values);
}

export default sql;
