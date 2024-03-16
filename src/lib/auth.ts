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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        console.log('Authorize method', credentials);

        if (!credentials?.email || !credentials?.password)
          throw new Error('Credentials is required');

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        });

        console.log('User', user);

        if (!user) throw new Error('User not found');

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!matchPassword) throw new Error('Invalid Password');

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
