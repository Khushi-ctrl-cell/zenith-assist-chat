import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickReplyButtonsProps {
  replies: string[];
  onReply: (reply: string) => void;
  className?: string;
}

export const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({
  replies,
  onReply,
  className
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {replies.map((reply, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onReply(reply)}
          className={cn(
            "quick-reply text-xs font-medium",
            "hover:scale-105 active:scale-95"
          )}
        >
          {reply}
        </Button>
      ))}
    </div>
  );
};