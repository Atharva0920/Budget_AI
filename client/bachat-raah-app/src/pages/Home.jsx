import React, { useState } from 'react';
import { Search, Bell, Menu, BarChart3, CreditCard, TrendingUp, Users, Calendar, Target, TrendingDown, PieChart, HelpCircle, User } from 'lucide-react';

const Home = () => {
  const [activeChat, setActiveChat] = useState('new-chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "👋 Hi there! I'm your Bachat Assistant, I'm here to help you understand your finances, provide support, and suggest strategies to improve your financial health. ✨",
      timestamp: 'Today at 17:32'
    },
    {
      id: 2,
      type: 'assistant',
      content: "Let's work together to achieve your goals! 😊📈",
      timestamp: 'Today at 17:32'
    },
    {
      id: 3,
      type: 'assistant',
      content: "Here are some questions you might want to ask or type anything that comes to mind and I'll answer your questions.",
      timestamp: 'Today at 17:32'
    },
    {
      id: 4,
      type: 'user',
      content: "📊 How are my investments doing?",
      timestamp: 'Today at 17:33'
    },
    {
      id: 5,
      type: 'assistant',
      content: "📊 Checking on your investments...",
      timestamp: 'Today at 17:33'
    }
  ]);

  const navigationItems = [
    { icon: BarChart3, label: 'Dashboard', active: false },
    { icon: CreditCard, label: 'Accounts', active: false },
    { icon: TrendingUp, label: 'Transactions', active: false },
    { icon: PieChart, label: 'Cash Flow', active: false },
    { icon: BarChart3, label: 'Reports', active: false, badge: 'BETA' },
    { icon: Target, label: 'Budget', active: false },
    { icon: Calendar, label: 'Recurring', active: false },
    { icon: Target, label: 'Goals', active: false },
    { icon: TrendingDown, label: 'Investments', active: false },
    { icon: HelpCircle, label: 'Advice', active: false },
    { icon: Users, label: 'Assistant', active: true }
  ];

  const chats = [
    { id: 'new-chat', title: 'New chat', time: 'less than a minute ago' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: message,
        timestamp: 'Now'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: "I'm here to help! Let me analyze that for you...",
          timestamp: 'Now'
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-blue-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-semibold">Bachat</span>
          </div>
        </div>

        {/* Trial Info */}
        <div className="p-4 border-b border-blue-500">
          <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
              <span>Free trial</span>
              <span>20 days left</span>
            </div>
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <button className={`w-full flex items-center gap-3 p-2 rounded text-left transition-colors ${
                  item.active ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}>
                  <item.icon size={16} />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs bg-blue-400 px-2 py-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-blue-500">
          <button className="w-full bg-orange-500 text-white p-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
            Get 1 Month Free
          </button>
          <button className="w-full flex items-center gap-2 p-2 text-sm hover:bg-blue-700 rounded mt-2">
            <HelpCircle size={16} />
            Help & Support
          </button>
          <div className="flex items-center gap-2 mt-4 p-2">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm">Jane Smith</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Assistant</h2>
              <div className="flex items-center gap-2">
                <Search size={16} className="text-gray-400" />
                <Bell size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium mb-3">Chats</h3>
            <div className="space-y-2">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    activeChat === chat.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="font-medium text-sm">{chat.title}</div>
                  <div className="text-xs text-gray-500">{chat.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">New chat</h2>
              <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.type === 'assistant' && (
                      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                    )}
                    <span className="text-xs opacity-75">
                      {msg.type === 'assistant' ? 'Assistant' : 'Jane Smith'} • {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about your money..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Answers from the Assistant may occasionally contain incorrect or inaccurate information. The Assistant is intended for informational purposes only and is not intended to provide personal financial advice. <span className="text-blue-500 cursor-pointer">Learn more</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
        </div>
      </div>
    </div>
  );
};

export default Home;