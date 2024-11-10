'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Send,
    Smile,
    MoreVertical,
    Image as ImageIcon,
    AlertCircle,
    ThumbsUp,
    Bot,
    Search,
    X,
    Heart,
    ThumbsDown,
    MessageCircle,
    AlertTriangle
} from 'lucide-react';

interface Message {
    id: string;
    content: string;
    type: 'user' | 'bot';
    timestamp: Date;
    suggestions?: string[];
    isLoading?: boolean;
    reactions?: {
        type: 'like' | 'heart' | 'dislike';
        count: number;
        userReacted?: boolean;
    }[];
}

interface ErrorState {
    show: boolean;
    message: string;
    type: 'error' | 'warning' | 'info';
}

const suggestionsList = [
    ["I'm feeling anxious", "I need help sleeping", "I'm feeling down"],
    ["Tell me more about anxiety", "What are some coping techniques?", "Can you guide me through breathing?"],
    ["I want to talk about my day", "How can I feel better?", "I need someone to listen"]
];

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! I'm your AI mental health companion. How are you feeling today?",
            type: 'bot',
            timestamp: new Date(),
            suggestions: suggestionsList[0],
            reactions: [
                { type: 'like', count: 0 },
                { type: 'heart', count: 0 },
                { type: 'dislike', count: 0 }
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userTyping, setUserTyping] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [error, setError] = useState<ErrorState>({ show: false, message: '', type: 'error' });
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!showSearch) {
            scrollToBottom();
        }
    }, [messages, showSearch]);

    // Handle user typing indicator
    const handleTypingIndicator = () => {
        setUserTyping(true);
        if (typingTimeout) clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            setUserTyping(false);
        }, 1000);

        setTypingTimeout(timeout);
    };

    // Error handling
    const showError = (message: string, type: ErrorState['type'] = 'error') => {
        setError({ show: true, message, type });
        setTimeout(() => {
            setError({ show: false, message: '', type: 'error' });
        }, 5000);
    };

    // Filter messages based on search
    const filteredMessages = messages.filter(message =>
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        try {
            // Add user message
            const userMessage: Message = {
                id: Date.now().toString(),
                content: inputValue,
                type: 'user',
                timestamp: new Date(),
                reactions: [
                    { type: 'like', count: 0 },
                    { type: 'heart', count: 0 },
                    { type: 'dislike', count: 0 }
                ]
            };

            // Add loading bot message
            const loadingMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: '',
                type: 'bot',
                timestamp: new Date(),
                isLoading: true
            };

            setMessages(prev => [...prev, userMessage, loadingMessage]);
            setInputValue('');
            setIsTyping(true);

            // Simulate API call
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputValue })
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            setIsTyping(false);
            setMessages(prev => {
                const newMessages = prev.filter(msg => !msg.isLoading);
                return [...newMessages, {
                    ...data,
                    reactions: [
                        { type: 'like', count: 0 },
                        { type: 'heart', count: 0 },
                        { type: 'dislike', count: 0 }
                    ]
                }];
            });
        } catch (error) {
            showError('Failed to send message. Please try again.');
            setMessages(prev => prev.filter(msg => !msg.isLoading));
            setIsTyping(false);
        }
    };

    const handleReaction = (messageId: string, reactionType: 'like' | 'heart' | 'dislike') => {
        setMessages(prev => prev.map(msg => {
            if (msg.id === messageId && msg.reactions) {
                const updatedReactions = msg.reactions.map(reaction => {
                    if (reaction.type === reactionType) {
                        return {
                            ...reaction,
                            count: reaction.userReacted ? reaction.count - 1 : reaction.count + 1,
                            userReacted: !reaction.userReacted
                        };
                    }
                    return { ...reaction, userReacted: false };
                });
                return { ...msg, reactions: updatedReactions };
            }
            return msg;
        }));
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Error Toast */}
            {error.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${error.type === 'error' ? 'bg-red-500 text-white' :
                    error.type === 'warning' ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                    }`}>
                    <AlertTriangle className="h-5 w-5" />
                    <p className="text-sm">{error.message}</p>
                    <button
                        onClick={() => setError({ show: false, message: '', type: 'error' })}
                        className="ml-2 hover:opacity-80"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Chat Header */}
            <div className="bg-white border-b px-4 py-3 sticky top-0 z-10">
                <div className="bg-white border-b px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 p-2 rounded-full">
                                <Bot className="h-6 w-6 text-primary-500" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-800">Mental Health Companion</h2>
                                <p className="text-xs text-gray-500">
                                    {userTyping ? 'Typing...' : 'Always here to listen'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setShowSearch(!showSearch);
                                    if (!showSearch) {
                                        setTimeout(() => searchInputRef.current?.focus(), 100);
                                    }
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <Search className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <MoreVertical className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {showSearch && (
                        <div className="mt-3 relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search messages..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-[180px]">
                {(searchQuery ? filteredMessages : messages).map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                            {/* Message Content */}
                            <div className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white border border-gray-200'
                                }`}>
                                {message.isLoading ? (
                                    <div className="flex space-x-2 h-6 items-center">
                                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                            style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                            style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                            style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                ) : (
                                    <p className="text-sm">{message.content}</p>
                                )}
                            </div>

                            {/* Timestamp and Reactions */}
                            <div className={`mt-1 flex items-center gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                }`}>
                                <p className="text-xs text-gray-400">

                                </p>

                                {message.reactions && (
                                    <div className="flex gap-1">
                                        {message.reactions.map((reaction) => (
                                            <button
                                                key={reaction.type}
                                                onClick={() => handleReaction(message.id, reaction.type)}
                                                className={`p-1 rounded-full transition-colors ${reaction.userReacted
                                                    ? 'bg-primary-100 text-primary-500'
                                                    : 'hover:bg-gray-100 text-gray-400'
                                                    }`}
                                            >
                                                {reaction.type === 'like' && <ThumbsUp className="h-3 w-3" />}
                                                {reaction.type === 'heart' && <Heart className="h-3 w-3" />}
                                                {reaction.type === 'dislike' && <ThumbsDown className="h-3 w-3" />}
                                                {reaction.count > 0 && (
                                                    <span className="text-xs ml-1">{reaction.count}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Suggestions */}
                            {message.type === 'bot' && message.suggestions && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {message.suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="text-sm bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="fixed bottom-[64px] left-0 right-0 bg-white border-t p-4">
                <div className="flex items-end space-x-3 max-w-7xl mx-auto">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Smile className="h-6 w-6 text-gray-400" />
                    </button>
                    <div className="flex-1 relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                handleTypingIndicator();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type a message..."
                            className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-500 resize-none text-sm"
                            style={{ maxHeight: '120px' }}
                            rows={1}
                        />
                        {inputValue.length > 0 && (
                            <button
                                onClick={handleSend}
                                className="absolute right-3 bottom-3 p-1 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <AlertCircle className="h-6 w-6 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}