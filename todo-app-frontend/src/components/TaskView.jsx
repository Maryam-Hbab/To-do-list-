import { useState, useEffect } from 'react';
import { LayoutGrid, List, Plus, ChevronDown } from 'lucide-react';
import CreateTaskModal from './CreateTaskModal';
import TaskDetailsModal from './TaskDetailsModal';

const initialTasks = [
  {
    id: 1,
    icon: "📺",
    title: "Watch a 2-min video: How ...",
    status: "New task",
    type: "Financial",
    dueDate: "2025-01-20",
    creationDate: "13 Jan 2025",
    closedDate: "-",
    description: "",
    estimatedTime: "0h 30m",
    showStatusDropdown: false
  },
  {
    id: 2,
    icon: "📱",
    title: "Download Bordio's mobile app",
    status: "Completed",
    type: "Financial",
    dueDate: "2025-01-25",
    creationDate: "13 Jan 2025",
    closedDate: "14 Jan 2025",
    description: "",
    estimatedTime: "0h 15m",
    showStatusDropdown: false
  }
];

const taskStatuses = ['New task', 'In progress', 'Completed'];

const TaskView = () => {
  const [activeView, setActiveView] = useState('table');
  const [showActiveTasks, setShowActiveTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleClickOutside = () => {
      setTasks(prevTasks => prevTasks.map(t => ({
        ...t,
        showStatusDropdown: false
      })));
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const activeTasks = tasks.filter(task => task.status !== 'Completed');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  const handleCreateTask = (newTask) => {
    const updatedTasks = [...tasks, { id: Date.now(), ...newTask, showStatusDropdown: false }];
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTask) => {
    const now = new Date().toLocaleDateString();
    if (updatedTask.status === 'Completed' && tasks.find(t => t.id === updatedTask.id)?.status !== 'Completed') {
      updatedTask.closedDate = now;
    } else if (updatedTask.status !== 'Completed') {
      updatedTask.closedDate = '-';
    }
    
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const TaskList = ({ tasks, title, count, isExpanded, onToggleExpand }) => (
    <>
      <div className="sticky top-0 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <button
            className="flex items-center px-4 py-2 hover:bg-gray-100 w-96"
            onClick={onToggleExpand}
          >
            <ChevronDown 
              className={`w-4 h-4 mr-2 transition-transform ${
                isExpanded ? 'transform rotate-0' : 'transform rotate-180'
              }`} 
            />
            {title} <span className="ml-2 text-gray-400">{count}</span>
          </button>
          <div className="px-4 py-2 w-32">Status</div>
          <div className="px-4 py-2 w-32">Type</div>
          <div className="px-4 py-2 w-32">Due date</div>
          <div className="px-4 py-2 w-40">Creation date</div>
          <div className="px-4 py-2 w-32">Closed date</div>
        </div>
      </div>

      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center text-sm hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-center px-4 py-2 w-96">
                <span className="mr-2">{task.icon}</span>
                <span className="truncate">{task.title}</span>
              </div>
              <div className="px-4 py-2 w-32 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentTarget = e.currentTarget;
                    const taskId = task.id;
                    setTasks(prevTasks => prevTasks.map(t => ({
                      ...t,
                      showStatusDropdown: t.id === taskId ? !t.showStatusDropdown : false
                    })));
                  }}
                  className="w-full text-left"
                >
                  {task.status}
                </button>
                {task.showStatusDropdown && (
                  <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {taskStatuses.map(status => (
                      <button
                        key={status}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          const now = new Date().toLocaleDateString();
                          const updatedTask = {
                            ...task,
                            status,
                            closedDate: status === 'Completed' ? now : '-',
                            showStatusDropdown: false
                          };
                          handleUpdateTask(updatedTask);
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-4 py-2 w-32">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  task.type === 'Financial' ? 'bg-yellow-100 text-yellow-800' :
                  task.type === 'Strategic' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.type}
                </span>
              </div>
              <div className="px-4 py-2 w-32">{task.dueDate}</div>
              <div className="px-4 py-2 w-40">{task.creationDate}</div>
              <div className="px-4 py-2 w-32">{task.closedDate}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add new
          </button>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 rounded flex items-center ${
                activeView === 'table' ? 'bg-white shadow' : ''
              }`}
              onClick={() => setActiveView('table')}
            >
              <List className="w-4 h-4 mr-2" />
              Table view
            </button>
            <button
              className={`px-3 py-1.5 rounded flex items-center ${
                activeView === 'kanban' ? 'bg-white shadow' : ''
              }`}
              onClick={() => setActiveView('kanban')}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Kanban board
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <TaskList
            tasks={activeTasks}
            title="Active tasks"
            count={activeTasks.length}
            isExpanded={showActiveTasks}
            onToggleExpand={() => setShowActiveTasks(!showActiveTasks)}
          />
          
          <TaskList
            tasks={completedTasks}
            title="Completed tasks"
            count={completedTasks.length}
            isExpanded={showCompletedTasks}
            onToggleExpand={() => setShowCompletedTasks(!showCompletedTasks)}
          />
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
      />

      <TaskDetailsModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskView;

