'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MahasiswaDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/page.js')
      return
    }

    if (session.user.role !== 'mahasiswa') {
      router.push('/unauthorized')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!session || session.user.role !== 'mahasiswa') {
    return null
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Portal Mahasiswa</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Selamat datang, {session.user.name}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Welcome Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#495057', marginBottom: '1rem' }}>
              Dashboard Mahasiswa
            </h2>
            <p style={{ color: '#6c757d', marginBottom: 0 }}>
              Selamat datang di portal mahasiswa. Username: <strong>{session.user.username}</strong>
            </p>
          </div>

          {/* Academic Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>IPK</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>3.45</p>
            </div>
            
            <div style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>SKS Diambil</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>21</p>
            </div>
            
            <div style={{
              backgroundColor: '#ffc107',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Semester</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>5</p>
            </div>
          </div>

          {/* Mata Kuliah */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#495057' }}>Mata Kuliah Semester Ini</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Kode</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Mata Kuliah</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>SKS</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Dosen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>IF101</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Pemrograman Web</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>3</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Dr. Ahmad</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>IF102</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Basis Data</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>3</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Dr. Sari</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>IF103</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Algoritma</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>3</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Dr. Budi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#495057' }}>Menu Mahasiswa</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <button style={{
                padding: '1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                Lihat Nilai
              </button>
              
              <button style={{
                padding: '1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                KRS
              </button>
              
              <button style={{
                padding: '1rem',
                backgroundColor: '#ffc107',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                Jadwal Kuliah
              </button>
              
              <button style={{
                padding: '1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                Transkrip
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}