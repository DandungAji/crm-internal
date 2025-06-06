import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, Clock } from "lucide-react";
import { format, addDays, isSameDay, isToday } from "date-fns";
import { toast } from "@/hooks/use-toast";

type Event = {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  type: string;
  attendees: string[];
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    type: "meeting",
  });

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Team Standup",
      description: "Daily team synchronization meeting",
      date: new Date(),
      time: "09:00",
      type: "meeting",
      attendees: ["Alice", "Bob", "Charlie"],
    },
    {
      id: 2,
      title: "Project Review",
      description: "Quarterly project review and planning",
      date: addDays(new Date(), 1),
      time: "14:00",
      type: "review",
      attendees: ["Alice", "Diana", "Eve"],
    },
    {
      id: 3,
      title: "Client Presentation",
      description: "Present website redesign to client",
      date: addDays(new Date(), 3),
      time: "10:30",
      type: "presentation",
      attendees: ["Alice", "Bob"],
    },
  ]);

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      attendees: [],
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
      time: "09:00",
      type: "meeting",
    });
    setIsEventDialogOpen(false);
    toast({
      title: "Success",
      description: "Event created successfully",
    });
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const getTodaysEvents = () => {
    return events.filter((event) => isToday(event.date));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "presentation":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black-900 dark:text-black-100">
            Calendar
          </h1>
          <p className="text-black-600 dark:text-black-400 mt-1">
            Manage your schedule and events
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleTodayClick}>
            Today
          </Button>
          <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-black hover:bg-accent">
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add a new event to your calendar
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDesc">Description</Label>
                  <Textarea
                    id="eventDesc"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    placeholder="Enter event description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate">Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={format(newEvent.date, "yyyy-MM-dd")}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          date: new Date(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventTime">Time</Label>
                    <Input
                      id="eventTime"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-sidebar border-black-200 dark:border-accent-light">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black-900 dark:text-black-100">
                  Choose the date
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border dark:border-accent-light dark w-full"
              />
            </CardContent>
          </Card>
        </div>

        {/* Today's Events */}
        <div className="lg:col-span-1">
          <Card className="bg-white border-black-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-black-900 dark:text-black-100">
                <Clock className="h-5 w-5 mr-2" />
                Today's Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getTodaysEvents().map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg bg-black-50 cursor-pointer hover:bg-accent dark:hover:bg-accent-darker transition-colors"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="font-medium text-sm text-black-900 dark:text-black-100">
                      {event.title}
                    </div>
                    <div className="text-xs text-black-600 dark:text-black-400 mt-1">
                      {event.time}
                    </div>
                    <Badge
                      className={`${getEventTypeColor(
                        event.type
                      )} text-xs mt-2`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                ))}
                {getTodaysEvents().length === 0 && (
                  <p className="text-sm text-black-500 dark:text-black-400">
                    No events today
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-1">
          {selectedEvent && (
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-black-900 dark:text-black-100">
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-black-900 dark:text-black-100">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-sm text-black-600 dark:text-black-400 mt-1">
                    {selectedEvent.description}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-black-600 dark:text-black-400">
                    <strong>Date:</strong> {format(selectedEvent.date, "PPP")}
                  </p>
                  <p className="text-black-600 dark:text-black-400">
                    <strong>Time:</strong> {selectedEvent.time}
                  </p>
                  <p className="text-black-600 dark:text-black-400">
                    <strong>Attendees:</strong>{" "}
                    {selectedEvent.attendees.join(", ") || "None"}
                  </p>
                </div>
                <Badge
                  className={`${getEventTypeColor(selectedEvent.type)} text-xs`}
                >
                  {selectedEvent.type}
                </Badge>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
