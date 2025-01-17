import { useState } from 'react';
import { Bell, Search, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TextEditor from './TextEditor';
import TaskView from './TaskView';
import CalendarView from './CalendarView';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/tasks':
        return <TaskView />;
      case '/calendar':
        return <CalendarView />;
      case '/notes':
        return <TextEditor />;
      default:
        return <TextEditor />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            {location.pathname === '/notes' && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add note
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <button className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">
              m
            </button>
          </div>
        </header>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;

