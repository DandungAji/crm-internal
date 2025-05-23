
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState("month");

  // Mock calendar events/deadlines
  const events = [
    {
      id: 1,
      title: "Website Redesign Deadline",
      type: "deadline",
      date: new Date(2024, 0, 15),
      project: "Website Redesign",
      priority: "High",
      time: "09:00"
    },
    {
      id: 2,
      title: "Marketing Campaign Review",
      type: "meeting",
      date: new Date(2024, 0, 10),
      project: "Marketing Campaign",
      priority: "Medium",
      time: "14:00"
    },
    {
      id: 3,
      title: "Mobile App Sprint Planning",
      type: "meeting",
      date: new Date(2024, 0, 12),
      project: "Mobile App Development",
      priority: "High",
      time: "10:30"
    },
    {
      id: 4,
      title: "Database Migration Checkpoint",
      type: "milestone",
      date: new Date(2024, 0, 20),
      project: "Database Migration",
      priority: "Critical",
      time: "16:00"
    },
    {
      id: 5,
      title: "Team Standup",
      type: "meeting",
      date: new Date(),
      project: "General",
      priority: "Low",
      time: "09:30"
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "deadline": return "bg-red-100 text-red-800 border-red-200";
      case "meeting": return "bg-blue-100 text-blue-800 border-blue-200";
      case "milestone": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
          <p className="text-slate-600 mt-1">Track deadlines, meetings, and milestones</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Widget */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  {format(currentDate, "MMMM yyyy")}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentDate}
                onMonthChange={setCurrentDate}
                className="w-full"
                modifiers={{
                  hasEvent: (date) => getEventsForDate(date).length > 0
                }}
                modifiersStyles={{
                  hasEvent: { 
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 'bold'
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Today's Events Summary */}
          <Card className="bg-white shadow-sm border-slate-200 mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Today's Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDate(new Date()).length > 0 ? (
                <div className="space-y-2">
                  {getEventsForDate(new Date()).map((event) => (
                    <div key={event.id} className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{event.title}</p>
                        <p className="text-xs text-slate-500">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No events today</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar View */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">
                  {format(currentDate, "MMMM yyyy")}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {monthDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isTodayDate = isToday(day);
                  
                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[100px] p-1 border border-slate-200 cursor-pointer transition-colors
                        ${isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-slate-50'}
                        ${isTodayDate ? 'bg-blue-100' : ''}
                      `}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`
                        text-sm font-medium mb-1
                        ${isTodayDate ? 'text-blue-900' : 'text-slate-900'}
                      `}>
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded truncate bg-blue-100 text-blue-800"
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && getSelectedDateEvents().length > 0 ? (
                <div className="space-y-3">
                  {getSelectedDateEvents().map((event) => (
                    <div key={event.id} className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-900 text-sm">{event.title}</h4>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`} />
                      </div>
                      <div className="space-y-1">
                        <Badge className={`${getEventTypeColor(event.type)} text-xs`}>
                          {event.type}
                        </Badge>
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <p className="text-xs text-slate-600">{event.project}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">
                    {selectedDate ? "No events on this date" : "Select a date to view events"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-white shadow-sm border-slate-200 mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {events
                  .filter(event => event.type === "deadline" && event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div key={event.id} className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{event.title}</p>
                        <p className="text-xs text-slate-500">{format(event.date, "MMM d")}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
