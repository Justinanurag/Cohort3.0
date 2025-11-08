import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "justinanurag0.2@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        // normally API/database check here

        if (username === "justinanurag0.2@gmail.com" && password) {
          return {
            id: "1",
            name: "Anurag",
            email: "justinanurag0.2@gmail.com",
          };
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
    GithubProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
});

export { handler as GET, handler as POST };
