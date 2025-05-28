"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DosenDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/page.js")
    } else if (session?.user?.role !== "dosen") {
      router.push("/dashboard")
    }
  }, [session, status, router])

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session || session.user?.role !== "dosen") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard Dosen
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Selamat datang, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Portal Dosen
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-500 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Total Mata Kuliah</h3>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Total Mahasiswa</h3>
                  <p className="text-3xl font-bold">240</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Menu Pengajaran
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left bg-blue-50 hover:bg-blue-100 p-3 rounded-md">
                      📚 Kelola Mata Kuliah
                    </button>
                    <button className="w-full text-left bg-green-50 hover:bg-green-100 p-3 rounded-md">
                      👥 Daftar Mahasiswa
                    </button>
                    <button className="w-full text-left bg-purple-50 hover:bg-purple-100 p-3 rounded-md">
                      📅 Jadwal Mengajar
                    </button>
                    <button className="w-full text-left bg-yellow-50 hover:bg-yellow-100 p-3 rounded-md">
                      📝 Input Nilai
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Aktivitas Terbaru
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="text-sm font-medium">Tugas baru diserahkan</p>
                      <p className="text-xs text-gray-600">2 jam yang lalu</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="text-sm font-medium">Mahasiswa baru bergabung</p>
                      <p className="text-xs text-gray-600">1 hari yang lalu</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <p className="text-sm font-medium">Jadwal kuliah diubah</p>
                      <p className="text-xs text-gray-600">3 hari yang lalu</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Info:</strong> Anda masuk sebagai dosen. Akses penuh pada fitur pengajaran dan manajemen kelas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}