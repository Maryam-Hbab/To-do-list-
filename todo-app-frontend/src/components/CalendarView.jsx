import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';

const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const tasks = {
  "13": [
    {
      id: 1,
      icon: "🧠",
      title: "Do a mind sweep: Write down all your to-dos in Bordio",
      time: "0:45",
      startTime: "0:45",
      color: "bg-green-100"
    },
    {
      id: 2,
      icon: "📅",
      title: "Plan your week",
      time: "0:30",
      startTime: "1:15",
      color: "bg-green-100"
    },
    {
      id: 3,
      icon: "📱",
      title: "Download to do list mobile app on your phone",
      time: "0:15",
      startTime: "2:00",
      color: "bg-yellow-100"
    },
    {
      id: 4,
      icon: "🔄",
      title: "Connect your Google Calendar",
      time: "0:15",
      startTime: "2:30",
      color: "bg-yellow-100"
    },
  ],
  "14": [
    {
      id: 5,
      icon: "🔔",
      title: "Set up daily habit reminders",
      time: "0:30",
      startTime: "1:15",
      color: "bg-green-100"
    },
    {
      id: 6,
      icon: "🎂",
      title: "Add birthday & holiday reminders in Bordio",
      time: "0:30",
      startTime: "2:00",
      color: "bg-green-100"
    },
    {
      id: 7,
      icon: "📅",
      title: "Create recurring tasks and events",
      time: "0:45",
      startTime: "3:00",
      color: "bg-green-100"
    },
    {
      id: 8,
      icon: "👤",
      title: "Upload your profile picture",
      time: "0:15",
      startTime: "4:00",
      color: "bg-purple-100"
    },
  ]
};

const waitingList = [
  {
    id: 1,
    icon: "🧹",
    title: "Clean your house",
    time: "2h",
    color: "bg-blue-100"
  },
  {
    id: 2,
    icon: "💰",
    title: "Get personal finances in order",
    time: "1:30h",
    color: "bg-green-100"
  },
  {
    id: 3,
    icon: "💻",
    title: "Install updates on PC and smartphone",
    time: "0:30h",
    color: "bg-blue-100"
  },
  {
    id: 4,
    icon: "💪",
    title: "Sign up for the gym",
    time: "0:30h",
    color: "bg-blue-100"
  },
  {
    id: 5,
    icon: "🏥",
    title: "Check your health",
    time: "1h",
    color: "bg-blue-100"
  },
];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 13)); // January 13, 2025

  const getDayName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getDateString = (date) => {
    return `${date.getDate()} ${getDayName(date)}`;
  };

  const previousDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const nextDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  return (
    <div className="flex-1 flex min-w-0">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add new
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Today
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-medium">January 2025</h2>
            <div className="flex items-center space-x-4">
              <button onClick={previousDay} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-8">
                {[-1, 0, 1].map((offset) => {
                  const date = new Date(currentDate);
                  date.setDate(currentDate.getDate() + offset);
                  return (
                    <div
                      key={offset}
                      className={`text-sm ${offset === 0 ? 'text-blue-500 border-b-2 border-blue-500 pb-2' : ''}`}
                    >
                      {getDateString(date)}
                    </div>
                  );
                })}
              </div>
              <button onClick={nextDay} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            <div className="flex-1 grid grid-cols-3 divide-x divide-gray-200">
              {[-1, 0, 1].map((offset) => {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + offset);
                const dayTasks = tasks[date.getDate().toString()] || [];
                
                return (
                  <div key={offset} className="min-w-[300px] relative">
                    {timeSlots.map((time, index) => (
                      <div
                        key={time}
                        className="h-20 border-b border-gray-100 px-2 relative"
                      >
                        <span className="absolute -top-3 left-2 text-xs text-gray-400">
                          {time}
                        </span>
                      </div>
                    ))}
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`absolute left-2 right-2 p-3 rounded-lg ${task.color} shadow-sm`}
                        style={{
                          top: `${parseInt(task.startTime) * 5}rem`,
                          minHeight: '5rem'
                        }}
                      >
                        <div className="flex items-start space-x-2">
                          <span>{task.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{task.title}</p>
                            <p className="text-xs text-gray-500">{task.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="w-80 border-l border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center">
                  Waiting list
                  <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    5
                  </span>
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {waitingList.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg ${task.color} shadow-sm`}
                  >
                    <div className="flex items-start space-x-2">
                      <span>{task.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

