import { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, LinkIcon, List, ListOrdered, Plus } from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState('');

  const formatButtons = [
    { icon: Bold, label: 'Bold' },
    { icon: Italic, label: 'Italic' },
    { icon: Underline, label: 'Underline' },
    { icon: AlignLeft, label: 'Align' },
    { icon: LinkIcon, label: 'Link' },
    { icon: List, label: 'Bullet List' },
    { icon: ListOrdered, label: 'Numbered List' },
    { icon: Plus, label: 'More' },
  ];

  return (
    <div className="flex-1 min-w-0">
      <div className="border-b border-gray-200 p-4">
        <input
          type="text"
          placeholder="New note"
          className="text-xl font-medium w-full outline-none"
        />
        <div className="text-sm text-gray-500 mt-1">Today</div>
      </div>
      
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
        <select className="px-3 py-1 rounded border border-gray-200 text-sm">
          <option>Normal text</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>
        
        <div className="flex items-center space-x-1">
          {formatButtons.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <textarea
          placeholder="Write your text here..."
          className="w-full h-full min-h-[200px] outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextEditor;

