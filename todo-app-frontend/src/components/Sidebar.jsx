import { Calendar, CheckSquare, FileText, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: FileText, label: 'Notes', path: '/notes' },
  ];

  return (
    <div className="w-48 bg-gray-50 h-screen p-4 border-r border-gray-200">
      <div className="mb-8">
        <h2 className="text-gray-600 font-medium px-4 mb-2">Tools</h2>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
              location.pathname === path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

