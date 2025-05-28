'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    // Redirect jika sudah login
    if (session) {
      if (session.user.role === 'admin') {
        router.push('/dashboard/admin')
      } else if (session.user.role === 'mahasiswa') {
        router.push('/dashboard/mahasiswa')
      } else if (session.user.role === 'dosen') {
        router.push('/dashboard/dosen')
      }
    }
  }, [session, status, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Username atau password salah')
      } else if (result?.ok) {
        // Tunggu session update, lalu redirect
        window.location.reload()
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          color: '#ffffff',
          fontSize: '1.2rem',
          fontWeight: '500'
        }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        width: '420px',
        maxWidth: '100%',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#2d3748',
          fontSize: '1.8rem',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          🎓 Login Sistem
        </h1>

        <div style={{
          marginBottom: '1.5rem',
          padding: '1.2rem',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
          borderRadius: '8px',
          fontSize: '0.9rem',
          border: '1px solid #e1bee7'
        }}>
          <h3 style={{ 
            margin: '0 0 0.8rem 0',
            color: '#4a148c',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            🔑 Akun Testing:
          </h3>
          <p style={{ 
            margin: '0.4rem 0',
            color: '#6a1b9a'
          }}>
            <strong style={{ color: '#4a148c' }}>Admin:</strong> 
            <span style={{ color: '#1565c0', fontFamily: 'monospace' }}> admin / admin</span>
          </p>
          <p style={{ 
            margin: '0.4rem 0',
            color: '#6a1b9a'
          }}>
            <strong style={{ color: '#4a148c' }}>Mahasiswa:</strong> 
            <span style={{ color: '#1565c0', fontFamily: 'monospace' }}> mhs / mhs</span>
          </p>
          <p style={{ 
            margin: '0.4rem 0',
            color: '#6a1b9a'
          }}>
            <strong style={{ color: '#4a148c' }}>Dosen:</strong> 
            <span style={{ color: '#1565c0', fontFamily: 'monospace' }}> dosen / dosen</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.6rem',
              fontWeight: '600',
              color: '#2d3748',
              fontSize: '0.95rem'
            }}>
              👤 Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                color: '#2d3748',
                backgroundColor: '#f7fafc',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.backgroundColor = '#ffffff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
                e.target.style.backgroundColor = '#f7fafc'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.6rem',
              fontWeight: '600',
              color: '#2d3748',
              fontSize: '0.95rem'
            }}>
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                color: '#2d3748',
                backgroundColor: '#f7fafc',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.backgroundColor = '#ffffff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
                e.target.style.backgroundColor = '#f7fafc'
              }}
            />
          </div>

          {error && (
            <div style={{
              color: '#e53e3e',
              marginBottom: '1.2rem',
              padding: '0.8rem',
              backgroundColor: '#fed7d7',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid #feb2b2',
              fontWeight: '500'
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            {loading ? '⏳ Loading...' : '🚀 Login'}
          </button>
        </form>
      </div>
    </div>
  )
}