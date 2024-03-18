import { NextAuthOptions } from 'next-auth';
import { db as prisma } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@teste.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password)
          throw new Error('As credenciais são obrigatórias');

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        });

        if (!user) throw new Error('Usuário não encontrado');

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!matchPassword) throw new Error('Senha inválida');

        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/register'
  }
};
