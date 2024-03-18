import { db as prisma } from '@/lib/db';

export async function getBusiness() {
  const business = await prisma.business.findMany();

  return business;
}
