import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { setSessionCookie } from '@/lib/session';
import { loginSchema } from '@/lib/validations';

const DEMO_EMAIL = 'demo@flowlist.app';
const DEMO_PASSWORD = 'Demo@12345';

async function ensureDemoUser() {
  const existing = await sql`SELECT id FROM users WHERE email = ${DEMO_EMAIL} LIMIT 1`;
  if (existing.length > 0) return;

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 12);
  await sql`
    INSERT INTO users (name, email, password)
    VALUES ('Demo User', ${DEMO_EMAIL}, ${hashedPassword})
    ON CONFLICT (email) DO NOTHING
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      await ensureDemoUser();
    }

    const result = await sql`SELECT id, email, name, password FROM users WHERE email = ${email} LIMIT 1`;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = await signToken({ userId: user.id, email: user.email });
    const response = NextResponse.json(
      { message: 'Logged in successfully', user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    );

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('[login] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
