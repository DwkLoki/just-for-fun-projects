import { Outlet } from 'react-router-dom'

export default function Root() {
    return (
        <div>
            {/* Semua halaman anak akan muncul di sini */}
            <Outlet />
        </div>
    )
}