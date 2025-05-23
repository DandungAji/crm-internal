
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, SendIcon, Plus, Paperclip } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
};

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  messages: Message[];
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewConversation, setIsNewConversation] = useState(false);
  const [newConversationRecipient, setNewConversationRecipient] = useState("");

  // Mock team members for conversation creation
  const teamMembers = [
    "Alice Johnson", "Bob Smith", "Charlie Davis", "Diana Wilson", 
    "Eve Brown", "Frank Miller", "Grace Lee"
  ];

  // Mock conversation data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Website Redesign Team",
      lastMessage: "Let's review the new homepage mockups",
      lastTimestamp: "10:23 AM",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "Alice Johnson",
          content: "Hi team! I've uploaded the new wireframes for the homepage.",
          timestamp: "Yesterday, 3:45 PM",
          isCurrentUser: false
        },
        {
          id: 2,
          sender: "You",
          content: "Thanks Alice, I'll take a look shortly.",
          timestamp: "Yesterday, 4:15 PM",
          isCurrentUser: true
        },
        {
          id: 3,
          sender: "Bob Smith",
          content: "I like the new layout. The navigation is much cleaner.",
          timestamp: "Yesterday, 4:32 PM",
          isCurrentUser: false
        },
        {
          id: 4,
          sender: "Charlie Davis",
          content: "Are we still planning to implement the animated banner?",
          timestamp: "Yesterday, 5:10 PM",
          isCurrentUser: false
        },
        {
          id: 5,
          sender: "Alice Johnson",
          content: "Let's review the new homepage mockups together this afternoon.",
          timestamp: "10:23 AM",
          isCurrentUser: false
        }
      ]
    },
    {
      id: 2,
      name: "Mobile App Development",
      lastMessage: "API integration is completed",
      lastTimestamp: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "Charlie Davis",
          content: "I've finished the API integration for user authentication.",
          timestamp: "Yesterday, 2:15 PM",
          isCurrentUser: false
        },
        {
          id: 2,
          sender: "You",
          content: "Great! Does it handle all the error cases we discussed?",
          timestamp: "Yesterday, 2:30 PM",
          isCurrentUser: true
        },
        {
          id: 3,
          sender: "Charlie Davis",
          content: "Yes, all error scenarios are covered. I've also added unit tests.",
          timestamp: "Yesterday, 2:45 PM",
          isCurrentUser: false
        },
        {
          id: 4,
          sender: "You",
          content: "Perfect. Let's schedule a demo for the team tomorrow.",
          timestamp: "Yesterday, 3:00 PM",
          isCurrentUser: true
        }
      ]
    },
    {
      id: 3,
      name: "Marketing Campaign",
      lastMessage: "Content calendar is updated",
      lastTimestamp: "Monday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "Diana Wilson",
          content: "I've updated the content calendar for Q1.",
          timestamp: "Monday, 9:30 AM",
          isCurrentUser: false
        },
        {
          id: 2,
          sender: "You",
          content: "Thanks Diana. Have you included the new product launch?",
          timestamp: "Monday, 10:15 AM",
          isCurrentUser: true
        },
        {
          id: 3,
          sender: "Diana Wilson",
          content: "Yes, it's scheduled for March 15th with a full campaign rollout.",
          timestamp: "Monday, 10:30 AM",
          isCurrentUser: false
        }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || selectedConversation === null) return;

    const updatedConversations = [...conversations];
    const conversationIndex = updatedConversations.findIndex(conv => conv.id === selectedConversation);
    
    if (conversationIndex === -1) return;

    const newMsg: Message = {
      id: updatedConversations[conversationIndex].messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: "Just now",
      isCurrentUser: true
    };

    updatedConversations[conversationIndex].messages.push(newMsg);
    updatedConversations[conversationIndex].lastMessage = newMessage;
    updatedConversations[conversationIndex].lastTimestamp = "Just now";

    setConversations(updatedConversations);
    setNewMessage("");

    // Simulate response after delay
    setTimeout(() => {
      const responseMsg: Message = {
        id: updatedConversations[conversationIndex].messages.length + 2,
        sender: updatedConversations[conversationIndex].name.split(" ")[0],
        content: getAutomaticResponse(),
        timestamp: "Just now",
        isCurrentUser: false
      };

      const updatedWithResponse = [...updatedConversations];
      updatedWithResponse[conversationIndex].messages.push(responseMsg);
      updatedWithResponse[conversationIndex].lastMessage = responseMsg.content;

      setConversations(updatedWithResponse);
    }, 2000);
  };

  const getAutomaticResponse = () => {
    const responses = [
      "Thanks for the update!",
      "I'll review this shortly.",
      "Let me check with the team and get back to you.",
      "Looks good to me!",
      "Can we discuss this more in our next meeting?",
      "I'll need more details on this.",
      "Great progress so far!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleCreateConversation = () => {
    if (!newConversationRecipient) {
      toast({
        title: "Error",
        description: "Please select a recipient",
        variant: "destructive"
      });
      return;
    }

    const newConv: Conversation = {
      id: conversations.length + 1,
      name: newConversationRecipient,
      lastMessage: "New conversation started",
      lastTimestamp: "Just now",
      unread: 0,
      messages: []
    };

    setConversations([...conversations, newConv]);
    setSelectedConversation(newConv.id);
    setIsNewConversation(false);
    setNewConversationRecipient("");

    toast({
      title: "Success",
      description: `Conversation with ${newConversationRecipient} created`
    });
  };

  const markAsRead = (conversationId: number) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unread: 0 } : conv
    ));
  };

  const getActiveConversation = () => {
    return conversations.find(conv => conv.id === selectedConversation);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-180px)] flex">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Messages</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsNewConversation(true)}
              className="h-9 w-9 p-0"
            >
              <Plus className="h-5 w-5" />
              <span className="sr-only">New Conversation</span>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation.id);
                markAsRead(conversation.id);
              }}
              className={`p-4 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors ${
                selectedConversation === conversation.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-slate-900">{conversation.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{conversation.lastMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-500">{conversation.lastTimestamp}</span>
                  {conversation.unread > 0 && (
                    <Badge className="mt-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-500">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No conversations found
            </div>
          )}
        </ScrollArea>

        {/* New Conversation Form */}
        {isNewConversation && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <h3 className="font-medium text-slate-900 mb-3">New Conversation</h3>
            <div className="space-y-3">
              <Select 
                value={newConversationRecipient}
                onValueChange={setNewConversationRecipient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>{member}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsNewConversation(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateConversation}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conversation Content */}
      <div className="w-2/3 flex flex-col overflow-hidden">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {getActiveConversation()?.name.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-slate-900">{getActiveConversation()?.name}</h3>
                  {/* Online indicator could go here */}
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>

            {/* Messages List */}
            <ScrollArea className="flex-1 p-4 bg-slate-50">
              <div className="space-y-4">
                {getActiveConversation()?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.isCurrentUser ? "bg-blue-500 text-white" : "bg-white"} p-3 rounded-lg shadow-sm`}>
                      {!message.isCurrentUser && (
                        <p className="text-xs font-medium mb-1">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isCurrentUser ? "text-blue-200" : "text-slate-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[44px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button className="shrink-0 bg-blue-600 hover:bg-blue-700" onClick={handleSendMessage}>
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col p-6 bg-slate-50">
            <div className="text-slate-400 mb-4">
              <MessageIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">No Conversation Selected</h3>
            <p className="text-slate-600 text-center max-w-md">
              Select an existing conversation from the list or create a new one to start messaging.
            </p>
            <Button 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsNewConversation(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Message icon component
const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

export default Messages;
