import React from 'react';
import { ArrowLeft, MessageCircle, TrendingUp, Clock, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
}

interface ChatAnalyticsProps {
  messages: Message[];
  onBack: () => void;
}

export const ChatAnalytics: React.FC<ChatAnalyticsProps> = ({ messages, onBack }) => {
  const userMessages = messages.filter(m => m.type === 'user');
  const botMessages = messages.filter(m => m.type === 'bot');
  
  const intentCounts = botMessages.reduce((acc, message) => {
    if (message.intent) {
      acc[message.intent] = (acc[message.intent] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topIntents = Object.entries(intentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const avgResponseTime = 1.2; // Simulated average response time in seconds

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    gradient 
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ElementType;
    gradient: string;
  }) => (
    <Card className="chat-glass border-0 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          gradient
        )}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto p-4">
      {/* Header */}
      <Card className="chat-glass p-4 mb-6 border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Chat Analytics</h1>
              <p className="text-sm text-muted-foreground">Real-time conversation insights</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Messages"
          value={messages.length}
          subtitle="All conversations"
          icon={MessageCircle}
          gradient="bg-gradient-to-br from-primary to-accent"
        />
        <StatCard
          title="User Queries"
          value={userMessages.length}
          subtitle="Customer interactions"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-accent to-primary"
        />
        <StatCard
          title="Bot Responses"
          value={botMessages.length}
          subtitle="AI assistance provided"
          icon={PieChart}
          gradient="bg-gradient-to-br from-primary to-accent"
        />
        <StatCard
          title="Avg Response Time"
          value={`${avgResponseTime}s`}
          subtitle="Quick assistance"
          icon={Clock}
          gradient="bg-gradient-to-br from-accent to-primary"
        />
      </div>

      {/* Intent Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Top Intents */}
        <Card className="chat-glass border-0 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Top Query Types
          </h3>
          <div className="space-y-3">
            {topIntents.map(([intent, count], index) => {
              const percentage = (count / botMessages.length) * 100;
              return (
                <div key={intent} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      index === 0 ? "bg-primary" :
                      index === 1 ? "bg-accent" :
                      index === 2 ? "bg-primary/70" :
                      "bg-muted-foreground"
                    )} />
                    <span className="text-sm text-foreground capitalize">
                      {intent.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-foreground">{count}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="chat-glass border-0 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Resolution Rate</span>
              <span className="text-sm font-medium text-foreground">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
              <span className="text-sm font-medium text-foreground">4.6/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">First Contact Resolution</span>
              <span className="text-sm font-medium text-foreground">73%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Escalation Rate</span>
              <span className="text-sm font-medium text-foreground">13%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};