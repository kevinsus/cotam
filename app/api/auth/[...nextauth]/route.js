import NextAuth from "next-auth"
import User from "@/models/user";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  callbacks: {
        async signIn({ profile }) {
            try {
                await connectToDB()

                const userExist = await User.findOne({ email: profile.email })
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture
                    })
                }

                return true
            } catch(e) {
                console.log(e)
                return false
            }
        },
        async session({ session }) {
            // Find the user with the email, and put the id (from db) to the sesion
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id 

            return session
        },
    }
})

export { handler as GET, handler as POST }