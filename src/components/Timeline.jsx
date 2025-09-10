import React from 'react';

const TimelineItem = ({ time, patient, type, status }) => (
    <div className="flex items-center space-x-4 py-3">
        <div className="w-16 text-sm text-muted-foreground">{time}</div>
        <div className="flex-1">
            <p className="font-medium text-foreground">{patient}</p>
            <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'completed' ? 'bg-green-100 text-green-800' :
            status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-muted text-muted-foreground'
        }`}>
            {status}
        </div>
    </div>
);

const Timeline = () => {
    const appointments = [
        { time: "9:00 AM", patient: "John Smith", type: "Cleaning", status: "completed" },
        { time: "10:30 AM", patient: "Sarah Johnson", type: "Checkup", status: "in-progress" },
        { time: "11:15 AM", patient: "Mike Davis", type: "Filling", status: "scheduled" },
        { time: "2:00 PM", patient: "Emma Wilson", type: "Consultation", status: "scheduled" },
        { time: "3:30 PM", patient: "David Brown", type: "X-Ray", status: "scheduled" }
    ];

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Today's Schedule</h3>
            <div className="space-y-1">
                {appointments.map((appointment, index) => (
                    <TimelineItem key={index} {...appointment} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;