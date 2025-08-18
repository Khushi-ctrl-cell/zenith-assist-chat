import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BarChart3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { QuickReplyButtons } from './QuickReplyButtons';
import { ChatAnalytics } from './ChatAnalytics';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! 👋 I\'m your AI support assistant. How can I help you today?',
      timestamp: new Date(),
      intent: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    'Track my order',
    'Return policy',
    'Product information',
    'Contact support',
    'Billing questions'
  ];

  const botResponses: Record<string, { content: string; intent: string }> = {
    'track': { 
      content: '📦 I can help you track your order! Please provide your order number and I\'ll look it up for you.', 
      intent: 'order_tracking' 
    },
    'return': { 
      content: '↩️ Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. Would you like to start a return?', 
      intent: 'returns' 
    },
    'product': { 
      content: '🛍️ I\'d be happy to help with product information! What specific product are you interested in learning about?', 
      intent: 'product_info' 
    },
    'support': { 
      content: '🎧 You can reach our human support team at support@company.com or call 1-800-SUPPORT. They\'re available 24/7!', 
      intent: 'contact_support' 
    },
    'billing': { 
      content: '💳 I can help with billing questions! Are you looking to update payment info, review charges, or something else?', 
      intent: 'billing' 
    },
    'default': { 
      content: '🤔 I understand you need help, but I\'m not sure about that specific request. Let me connect you with a human agent who can better assist you!', 
      intent: 'fallback' 
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): { content: string; intent: string } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('track') || message.includes('order') || message.includes('shipping')) {
      return botResponses.track;
    }
    if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return botResponses.return;
    }
    if (message.includes('product') || message.includes('item') || message.includes('buy')) {
      return botResponses.product;
    }
    if (message.includes('support') || message.includes('help') || message.includes('agent')) {
      return botResponses.support;
    }
    if (message.includes('bill') || message.includes('payment') || message.includes('charge')) {
      return botResponses.billing;
    }
    
    return botResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        intent: response.intent
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: 'Hello! 👋 I\'m your AI support assistant. How can I help you today?',
        timestamp: new Date(),
        intent: 'greeting'
      }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (showAnalytics) {
    return <ChatAnalytics messages={messages} onBack={() => setShowAnalytics(false)} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <Card className="chat-glass p-4 mb-4 border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-float">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">AI Support Assistant</h1>
              <p className="text-sm text-muted-foreground">Always here to help • Online now</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAnalytics(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Chat Container */}
      <Card className="chat-glass flex-1 border-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <QuickReplyButtons 
            replies={quickReplies} 
            onReply={handleQuickReply}
            className="px-6 pb-4"
          />

          {/* Input Area */}
          <div className="p-6 pt-0">
            <div className="flex space-x-3">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={cn(
                  "flex-1 bg-input/50 border-border/50 text-foreground",
                  "backdrop-blur-sm focus:bg-input/70 focus:border-ring/50",
                  "placeholder:text-muted-foreground"
                )}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                  "glow-primary disabled:opacity-50 disabled:shadow-none",
                  "transition-all duration-200"
                )}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;