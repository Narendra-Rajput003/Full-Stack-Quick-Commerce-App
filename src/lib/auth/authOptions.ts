import GoogleProvider from "next-auth/providers/google";
import { db } from "../db/db";
import { users } from "../db/schema";

interface GoogleProfile {
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
  picture: string;
}

interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  provider: string;
  external_id: string;
  image: string;
  role: string;
}

interface Session {
  user: User;
}

interface Token {
  role: string;
  id: string;
}
type UserProfileData = Omit<User, 'id' | 'role'>

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      async profile(profileData: GoogleProfile, token: any) {
        const data: UserProfileData = {
          fname: profileData.given_name,
          lname: profileData.family_name,
          email: profileData.email,
          provider: 'GOOGLE',
          external_id: profileData.sub,
          image: profileData.picture,
        };

        try {
          const user = await db.insert(users).values(data).onConflictDoUpdate({
            target: users.email,
            set: data,
          }).returning();

          if (user.length === 0) {
            throw new Error('User not found');
          }

          const userData: User = {
            ...data,
            id: String(user[0].id),
            role: user[0].role,
          };

          return userData;
        } catch (error) {
          console.error('Error inserting user:', error);
          throw new Error('User insertion failed');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session, token: Token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: Token, user: User }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
}
