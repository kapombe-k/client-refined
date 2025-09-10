import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Stethoscope } from 'lucide-react';

const Calendar = ({ onAppointmentSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Enhanced mock appointments data with more details
    const appointments = [
        {
            id: 1,
            time: '9:00 AM',
            patient: 'John Smith',
            treatment: 'Dental Cleaning',
            status: 'confirmed',
            doctor: 'Dr. Smith',
            duration: '30 min',
            notes: 'Regular checkup and cleaning'
        },
        {
            id: 2,
            time: '10:30 AM',
            patient: 'Sarah Johnson',
            treatment: 'Cavity Filling',
            status: 'in-progress',
            doctor: 'Dr. Johnson',
            duration: '45 min',
            notes: 'Emergency procedure - patient in pain'
        },
        {
            id: 3,
            time: '11:15 AM',
            patient: 'Mike Davis',
            treatment: 'Root Canal',
            status: 'scheduled',
            doctor: 'Dr. Davis',
            duration: '90 min',
            notes: 'Patient experiencing severe tooth pain'
        },
        {
            id: 4,
            time: '2:00 PM',
            patient: 'Emma Wilson',
            treatment: 'Consultation',
            status: 'scheduled',
            doctor: 'Dr. Smith',
            duration: '15 min',
            notes: 'New patient consultation'
        },
        {
            id: 5,
            time: '3:30 PM',
            patient: 'David Brown',
            treatment: 'X-Ray',
            status: 'scheduled',
            doctor: 'Dr. Johnson',
            duration: '20 min',
            notes: 'Follow-up on previous treatment'
        },
        {
            id: 6,
            time: '4:00 PM',
            patient: 'Lisa Anderson',
            treatment: 'Dental Cleaning',
            status: 'confirmed',
            doctor: 'Dr. Davis',
            duration: '30 min',
            notes: 'Routine cleaning appointment'
        }
    ];

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];

    const getAppointmentForTime = (time) => {
        return appointments.find(apt => apt.time === time);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-50 border-green-200 hover:bg-green-100';
            case 'in-progress': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
            case 'scheduled': return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
            case 'completed': return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
            default: return 'bg-muted border-border hover:bg-muted/80';
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'scheduled': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const navigateDate = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + direction);
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                        {formatDate(currentDate)}
                    </h3>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => navigateDate(-1)}
                        className="p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={goToToday}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => navigateDate(1)}
                        className="p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-3">
                {timeSlots.map((time) => {
                    const appointment = getAppointmentForTime(time);
                    return (
                        <div
                            key={time}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                appointment ? getStatusColor(appointment.status) : 'border-border hover:bg-muted/50'
                            }`}
                            onClick={() => appointment && onAppointmentSelect(appointment)}
                        >
                            <div className="w-20 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {time}
                            </div>

                            {appointment ? (
                                <div className="flex-1 ml-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <div className="flex items-center gap-1">
                                            <Stethoscope className="w-4 h-4" />
                                            <span>{appointment.doctor}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{appointment.treatment}</span>
                                        <span>•</span>
                                        <span>{appointment.duration}</span>
                                    </div>

                                    {appointment.notes && (
                                        <div className="text-sm text-muted-foreground bg-background/50 p-2 rounded border">
                                            {appointment.notes}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 ml-4">
                                    <div className="text-muted-foreground text-sm">Available slot</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Status Legend</h4>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                        <span className="text-sm text-muted-foreground">Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
                        <span className="text-sm text-muted-foreground">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                        <span className="text-sm text-muted-foreground">Scheduled</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div>
                        <span className="text-sm text-muted-foreground">Completed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;