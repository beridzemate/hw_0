import { Link } from 'react-router-dom';
import { HomeIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Post App</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white flex items-center">
            <HomeIcon className="h-5 w-5 mr-1" /> Home
          </Link>
          <Link to="/create-post" className="text-white flex items-center">
            <PlusIcon className="h-5 w-5 mr-1" /> New Post
          </Link>
          <Link to="/login" className="text-white flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-1" /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}