import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 justify-start message-bubble">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0 mt-1">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      
      <div className="bot-message px-4 py-3 shadow-lg">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
        <p className="text-xs opacity-70 text-bot-message-foreground mt-1">
          AI is typing...
        </p>
      </div>
    </div>
  );
};