import { db as prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, cnpj } = data;

  if (!name || !cnpj) {
    return NextResponse.json(
      { error: 'Informações inválidas' },
      { status: 400 }
    );
  }

  const isBusinessExists = await prisma.business.findUnique({
    where: {
      cnpj: cnpj
    }
  });

  if (isBusinessExists) {
    return NextResponse.json({ error: 'Empresa já existe' }, { status: 400 });
  }

  const date = new Date();
  const expireAt = new Date(
    date.setMonth(date.getMonth() + 1)
  ).toLocaleDateString();
  console.log(expireAt);

  const business = await prisma.business.create({
    data: {
      name,
      cnpj,
      expireAt
    }
  });

  return NextResponse.json(business, { status: 201 });
}
