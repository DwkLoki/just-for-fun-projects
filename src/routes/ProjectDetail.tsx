import { useParams, Link } from 'react-router-dom'
import projectsArr from '../data/projectsData'
import { useEffect } from 'react';

export default function ProjectDetail() {
    const { slug } = useParams()
    const project = projectsArr.find(p => p.slug === slug);

    // ganti favicon dan title pada tab browser secara dinamis
    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Just For Fun Projects`;

            // Ubah favicon secara dinamis
            const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (favicon) {
                // Gunakan nama file berdasarkan slug
                favicon.href = `/favicon-${project.slug}.png`;
            }
        } else {
            document.title = `Project Not Found | Just For Fun Projects`;

            // fallback favicon
            const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (favicon) {
                favicon.href = '/vite.svg';
            }
        }

        // Reset favicon saat keluar dari halaman
        return () => {
            const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (favicon) {
                favicon.href = '/vite.svg';
            }
            document.title = 'Just For Fun Projects';
        };
    }, [project]);      

    if (!project) {
        return (
            <div className="text-white p-8 bg-red-500">
                <h1 className="text-xl font-bold">Project not found.</h1>
                <Link to="/" className="underline inline-block">← Back to Home</Link>
            </div>
        );          
    }

    return (
        <div className="min-h-screen bg-purple-950 text-white p-8">
            <Link to="/" className="text-purple-300 underline mb-4 inline-block">← Back to Home</Link>

            {/* Tampilkan komponen jika ada */}
            {project.component ? project.component : <p className="text-gray-300 italic">No component available.</p>}
        </div>
    )
}
