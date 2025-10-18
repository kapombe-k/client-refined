import React from 'react';

const NextPatientCard = () => {
    const nextPatient = {
        name: "Sarah Johnson",
        age: 32,
        gender: "Female",
        appointmentTime: "10:30 AM",
        reason: "Regular Checkup",
        avatar: "👩"
    };

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Next Patient</h3>
            <div className="flex items-center space-x-4">
                <div className="text-4xl">{nextPatient.avatar}</div>
                <div className="flex-1">
                    <h4 className="font-medium text-foreground">{nextPatient.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {nextPatient.age} years old • {nextPatient.gender}
                    </p>
                    <p className="text-sm text-blue-600 font-medium">
                        {nextPatient.appointmentTime}
                    </p>
                    <p className="text-sm text-muted-foreground">{nextPatient.reason}</p>
                </div>
            </div>
            <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Start Visit
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default NextPatientCard;