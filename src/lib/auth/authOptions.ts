import GoogleProvider from "next-auth/providers/google";
import { db } from "../db/db";
import { users } from "../db/schema";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile({ given_name, family_name, email, sub, picture }: any, token: any) {
        const data = {
          fname: given_name,
          lname: family_name,
          email: email,
          provider: 'GOOGLE',
          external_id: sub,
          image: picture,
        };
        try {
          const user = await db.insert(users).values(data).onConflictDoUpdate({
            target: users.email,
            set: data,
          }).returning();
          return {
            ...data,
            name: data.fname,
            id: String(user[0]?.id),
            role: user[0]?.role,
          };
        } catch (error) {
          console.error("Error inserting user:", error); // Improved error logging
          throw new Error("User insertion failed");
        }
        // Fallback return if insertion fails
        return {
          id: sub,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    }
  }
};
