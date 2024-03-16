import { db as prisma } from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { fullname, email, password } = data;
  console.log('ROUTE HANDLER', data);

  if (!fullname || !email || !password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (isUserExists) {
    return NextResponse.json(
      { error: 'Email already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      fullname,
      hashedPassword
    }
  });

  return NextResponse.json(user, { status: 201 });
}
