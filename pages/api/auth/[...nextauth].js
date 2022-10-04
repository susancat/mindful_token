import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET
})