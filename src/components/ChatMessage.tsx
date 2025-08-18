import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={cn(
      "flex gap-3 message-bubble",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[70%] px-4 py-3 shadow-lg",
        isBot ? "bot-message" : "user-message"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <p className={cn(
          "text-xs mt-2 opacity-70",
          isBot ? "text-bot-message-foreground" : "text-user-message-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-user-message to-primary flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-4 h-4 text-user-message-foreground" />
        </div>
      )}
    </div>
  );
};