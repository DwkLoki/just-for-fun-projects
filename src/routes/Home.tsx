import { Link } from 'react-router-dom'
import projectsArr from '../data/projectsData'

export default function Home() {
    const projects = projectsArr.map(project => {
        return (
            <div
                key={project.id}
                className="snap-start relative group flex-shrink-0 h-72 w-52 rounded-2xl overflow-hidden transition-all duration-500"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Only link area becomes clickable */}
                <Link
                    to={`/project/${project.slug}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                    <span className="cursor-pointer text-white text-sm font-semibold bg-purple-600 px-4 py-2 rounded-lg shadow-md">
                        See Project
                    </span>
                </Link>
            </div>
        );
    });


    return (
        <div className="font-lato min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900">
            {/* Header */}
            <header className="pt-12 pb-2 flex space-x-80 border-b-2 mx-12">
                <h1 className="text-5xl text-white font-bold leading-tight w-1/4">Just For Fun Projects</h1>
                <p className='w-[411px] text-white text-sm flex items-end'>A collection of small, self-initiated projects built during spare time. Most are experimental, fun, and serve as a playground to explore new tools, libraries, or random ideas.</p>
            </header>

            {/* Projects Section */}
            <div className="py-6 pl-12">
                <p className='mb-4 text-white'>Drag or swipe to browse all items</p>
                <div className='flex space-x-6 overflow-x-scroll scrollbar-hidden snap-x snap-mandatory'>
                    {projects}
                </div>
            </div>
        </div>
    );
}