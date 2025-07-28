import React, { useState } from 'react';
import {
    MessageCircle,
    Search,
    Bell,
    Plus,
    User,
    Bot,
    Send,
    Trash2,
    MoreVertical,
    Sparkles,
    TrendingUp,
    DollarSign,
    PieChart,
    Target,
    CreditCard,
    AlertCircle,
    Info
} from 'lucide-react';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTheme } from '../hooks/useTheme';

const AssistantPage = () => {
    const [activeChat, setActiveChat] = useState('new-chat');
    const [message, setMessage] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const { darkMode, privateMode } = useTheme();

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'assistant',
            content: "👋 Hi there! I'm your Budget AI Assistant. I'm here to help you understand your finances, provide support, and suggest strategies to improve your financial health. ✨",
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
            content: "📊 Checking on your investments... Based on your portfolio, you're showing positive growth this month with a 3.2% increase. Your diversified approach is working well!",
            timestamp: 'Today at 17:33'
        }
    ]);

    const [chats] = useState([
        { id: 'new-chat', title: 'Financial Planning', time: 'less than a minute ago', messageCount: 5 },
        { id: 'budget-help', title: 'Budget Optimization', time: '2 hours ago', messageCount: 12 },
        { id: 'investment-advice', title: 'Investment Strategy', time: 'Yesterday', messageCount: 8 }
    ]);

    // Quick action suggestions
    const quickActions = [
        { icon: TrendingUp, text: "Analyze my spending trends", color: 'blue' },
        { icon: DollarSign, text: "How can I save more money?", color: 'green' },
        { icon: PieChart, text: "Review my budget allocation", color: 'purple' },
        { icon: Target, text: "Set financial goals", color: 'orange' },
        { icon: CreditCard, text: "Optimize my bills", color: 'red' }
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
                    content: "I'm analyzing your request... Let me provide you with personalized insights based on your financial data.",
                    timestamp: 'Now'
                };
                setMessages(prev => [...prev, assistantMessage]);
            }, 1000);
        }
    };

    const handleQuickAction = (actionText) => {
        setMessage(actionText);
        handleSendMessage();
    };

    const headerActions = (
        <div className="flex items-center gap-2">
            <Button 
                variant="ghost" 
                icon={Search} 
                size="sm"
                darkMode={darkMode}
            />
            <Button 
                variant="ghost" 
                icon={Bell} 
                size="sm"
                darkMode={darkMode}
            />
            <Button 
                onClick={() => setShowSidebar(!showSidebar)}
                variant="ghost" 
                icon={MoreVertical} 
                size="sm"
                darkMode={darkMode}
            />
        </div>
    );

    // Summary stats for assistant usage
    const summaryCards = [
        {
            title: 'Conversations',
            value: chats.length.toString(),
            icon: MessageCircle,
            badge: 'Active',
            changeType: 'positive',
            subtitle: 'Chat sessions'
        },
        {
            title: 'Messages',
            value: chats.reduce((sum, chat) => sum + chat.messageCount, 0).toString(),
            icon: Bot,
            badge: 'Total',
            changeType: 'neutral',
            subtitle: 'Exchanged'
        },
        {
            title: 'Insights',
            value: '12',
            icon: Sparkles,
            badge: 'This week',
            changeType: 'positive',
            subtitle: 'Generated'
        }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PageHeader
                    title="AI Assistant"
                    subtitle="Get personalized financial insights and advice"
                    actions={headerActions}
                    darkMode={darkMode}
                />

                {/* Main Chat Interface */}
                <div className="flex gap-6">
                    {/* Sidebar */}
                    {showSidebar && (
                        <div className="w-80">
                            <Card darkMode={darkMode} className="h-full">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Chat History
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Plus}
                                            darkMode={darkMode}
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {chats.map(chat => (
                                            <div
                                                key={chat.id}
                                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                                                    activeChat === chat.id 
                                                        ? darkMode 
                                                            ? 'bg-blue-600/20 border-l-4 border-blue-500' 
                                                            : 'bg-blue-50 border-l-4 border-blue-500'
                                                        : darkMode
                                                            ? 'hover:bg-gray-800'
                                                            : 'hover:bg-gray-50'
                                                }`}
                                                onClick={() => setActiveChat(chat.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`font-medium text-sm truncate ${
                                                            darkMode ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                            {chat.title}
                                                        </div>
                                                        <div className={`text-xs mt-1 ${
                                                            darkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            {chat.time} • {chat.messageCount} messages
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        icon={Trash2}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="p-6">
                                    <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Quick Actions
                                    </h4>
                                    <div className="space-y-2">
                                        {quickActions.map((action, index) => {
                                            const IconComponent = action.icon;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleQuickAction(action.text)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                                                        darkMode 
                                                            ? 'hover:bg-gray-800 text-gray-300' 
                                                            : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                                >
                                                    <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                                                        <IconComponent className={`text-${action.color}-600`} size={16} />
                                                    </div>
                                                    <span className="text-sm">{action.text}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Chat Area */}
                    <div className="flex-1">
                        <Card darkMode={darkMode} className="h-[600px] flex flex-col">
                            {/* Chat Header */}
                            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Bot className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                Financial Planning
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                AI Assistant • Online
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={Trash2}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Delete Chat
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs lg:max-w-md ${msg.type === 'user' ? 'order-2' : ''}`}>
                                            <div className={`flex items-center gap-2 mb-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                                                {msg.type === 'assistant' && (
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                        <Bot className="text-white" size={16} />
                                                    </div>
                                                )}
                                                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {msg.type === 'assistant' ? 'Assistant' : 'You'} • {msg.timestamp}
                                                </span>
                                                {msg.type === 'user' && (
                                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                                        <User className="text-white" size={16} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`px-4 py-3 rounded-2xl ${
                                                msg.type === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : darkMode
                                                        ? 'bg-gray-800 text-gray-100'
                                                        : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ask anything about your money..."
                                        darkMode={darkMode}
                                        className="flex-1"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        icon={Send}
                                        disabled={!message.trim()}
                                        className="px-6"
                                    >
                                        Send
                                    </Button>
                                </div>
                                
                                {/* Disclaimer */}
                                <div className={`flex items-start gap-2 mt-4 p-3 rounded-lg ${
                                    darkMode ? 'bg-yellow-900/20 border border-yellow-800/30' : 'bg-yellow-50 border border-yellow-200'
                                }`}>
                                    <AlertCircle className={`mt-0.5 flex-shrink-0 ${
                                        darkMode ? 'text-yellow-400' : 'text-yellow-600'
                                    }`} size={16} />
                                    <div>
                                        <p className={`text-xs leading-relaxed ${
                                            darkMode ? 'text-yellow-200' : 'text-yellow-800'
                                        }`}>
                                            Answers from the Assistant may occasionally contain incorrect or inaccurate information. 
                                            The Assistant is intended for informational purposes only and is not intended to provide 
                                            personal financial advice.{' '}
                                            <button className="text-blue-500 hover:text-blue-600 underline">
                                                Learn more
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantPage;