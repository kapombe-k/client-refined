import React from 'react';

const QueueItem = ({ patient, status, onClick }) => (
    <div
        onClick={() => onClick(patient)}
        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
            status === 'waiting' ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' :
            status === 'in-progress' ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' :
            'border-green-300 bg-green-50 hover:bg-green-100'
        }`}
    >
        <div className="flex items-center space-x-3">
            <div className="text-2xl">{patient.avatar || '👤'}</div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.age} years • {patient.gender}</p>
                <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'waiting' ? 'bg-yellow-200 text-yellow-800' :
                status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                'bg-green-200 text-green-800'
            }`}>
                {status}
            </div>
        </div>
    </div>
);

const PatientQueuePanel = ({ onPatientSelect }) => {
    const queuePatients = [
        {
            id: 1,
            name: "Sarah Johnson",
            age: 32,
            gender: "Female",
            phone: "+1-555-0124",
            email: "sarah.johnson@email.com",
            insurance_id: "INS-002-2024",
            lastVisit: "2 days ago",
            status: "waiting",
            avatar: "👩"
        },
        {
            id: 2,
            name: "Mike Davis",
            age: 45,
            gender: "Male",
            phone: "+1-555-0125",
            email: "mike.davis@email.com",
            insurance_id: "INS-003-2024",
            lastVisit: "1 week ago",
            status: "in-progress",
            avatar: "👨"
        },
        {
            id: 3,
            name: "Emma Wilson",
            age: 28,
            gender: "Female",
            phone: "+1-555-0126",
            email: "emma.wilson@email.com",
            insurance_id: "INS-004-2024",
            lastVisit: "3 days ago",
            status: "completed",
            avatar: "👩"
        },
        {
            id: 6,
            name: "Lisa Anderson",
            age: 29,
            gender: "Female",
            phone: "+1-555-0128",
            email: "lisa.anderson@email.com",
            insurance_id: "INS-006-2024",
            lastVisit: "1 day ago",
            status: "waiting",
            avatar: "👩"
        }
    ];

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Patient Queue</h3>
            <div className="space-y-3">
                {queuePatients.map((patient) => (
                    <QueueItem
                        key={patient.id}
                        patient={patient}
                        status={patient.status}
                        onClick={onPatientSelect}
                    />
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Add to Queue
                </button>
            </div>
        </div>
    );
};

export default PatientQueuePanel;