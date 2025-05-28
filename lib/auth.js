import CredentialsProvider from 'next-auth/providers/credentials'

// Database user untuk testing
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin',
    role: 'admin',
    name: 'Administrator'
  },
  {
    id: '2',
    username: 'mhs',
    password: 'mhs',
    role: 'mahasiswa',
    name: 'Mahasiswa'
  },
  {
    id: '3',
    username: 'dosen',
    password: 'dosen',
    role: 'dosen',
    name: 'Dosen'
  }
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = users.find(
          u => u.username === credentials.username && u.password === credentials.password
        )

        if (user) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key'
}