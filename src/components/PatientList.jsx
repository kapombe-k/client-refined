import React from 'react';

const PatientCard = ({ patient, onSelect }) => (
    <div
        onClick={() => onSelect(patient)}
        className="bg-background p-4 rounded-lg border border-border cursor-pointer hover:shadow-md transition-shadow"
    >
        <div className="flex items-center space-x-4">
            <div className="text-3xl">{patient.avatar || '👤'}</div>
            <div className="flex-1">
                <h3 className="font-medium text-foreground">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">
                    {patient.age} years • {patient.gender} • {patient.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                    Last visit: {patient.lastVisit} • Status: {patient.status}
                </p>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90">
                    View Profile
                </button>
                <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                    Schedule
                </button>
            </div>
        </div>
    </div>
);

const PatientList = ({ searchParams, onPatientSelect, viewMode = 'cards' }) => {
    // Enhanced mock patient data with more fields for better search
    const patients = [
        {
            id: 1,
            name: "John Smith",
            age: 35,
            gender: "Male",
            phone: "+1-555-0123",
            email: "john.smith@email.com",
            insurance_id: "INS-001-2024",
            lastVisit: "2 weeks ago",
            status: "Active",
            avatar: "👨"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            age: 32,
            gender: "Female",
            phone: "+1-555-0124",
            email: "sarah.johnson@email.com",
            insurance_id: "INS-002-2024",
            lastVisit: "3 days ago",
            status: "Active",
            avatar: "👩"
        },
        {
            id: 3,
            name: "Mike Davis",
            age: 45,
            gender: "Male",
            phone: "+1-555-0125",
            email: "mike.davis@email.com",
            insurance_id: "INS-003-2024",
            lastVisit: "1 week ago",
            status: "Active",
            avatar: "👨"
        },
        {
            id: 4,
            name: "Emma Wilson",
            age: 28,
            gender: "Female",
            phone: "+1-555-0126",
            email: "emma.wilson@email.com",
            insurance_id: "INS-004-2024",
            lastVisit: "1 month ago",
            status: "Inactive",
            avatar: "👩"
        },
        {
            id: 5,
            name: "David Brown",
            age: 52,
            gender: "Male",
            phone: "+1-555-0127",
            email: "david.brown@email.com",
            insurance_id: "INS-005-2024",
            lastVisit: "5 days ago",
            status: "Active",
            avatar: "👨"
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
            status: "Active",
            avatar: "👩"
        },
        {
            id: 7,
            name: "Robert Taylor",
            age: 41,
            gender: "Male",
            phone: "+1-555-0129",
            email: "robert.taylor@email.com",
            insurance_id: "INS-007-2024",
            lastVisit: "2 days ago",
            status: "Active",
            avatar: "👨"
        },
        {
            id: 8,
            name: "Jennifer Martinez",
            age: 33,
            gender: "Female",
            phone: "+1-555-0130",
            email: "jennifer.martinez@email.com",
            insurance_id: "INS-008-2024",
            lastVisit: "6 months ago",
            status: "Inactive",
            avatar: "👩"
        }
    ];

    // Enhanced filtering based on search params
    const filteredPatients = patients.filter(patient => {
        // General search query
        if (searchParams?.q) {
            const query = searchParams.q.toLowerCase();
            const searchableFields = [
                patient.name,
                patient.phone,
                patient.email,
                patient.insurance_id
            ].filter(Boolean);

            if (!searchableFields.some(field => field.toLowerCase().includes(query))) {
                return false;
            }
        }

        // Specific field filters
        if (searchParams?.name && !patient.name.toLowerCase().includes(searchParams.name.toLowerCase())) {
            return false;
        }
        if (searchParams?.phone && !patient.phone.includes(searchParams.phone)) {
            return false;
        }
        if (searchParams?.email && !patient.email?.toLowerCase().includes(searchParams.email.toLowerCase())) {
            return false;
        }
        if (searchParams?.insurance_id && !patient.insurance_id?.includes(searchParams.insurance_id)) {
            return false;
        }
        if (searchParams?.gender && patient.gender.toLowerCase() !== searchParams.gender) {
            return false;
        }
        if (searchParams?.status && patient.status.toLowerCase() !== searchParams.status) {
            return false;
        }

        // Age range filters
        if (searchParams?.min_age && patient.age < parseInt(searchParams.min_age)) {
            return false;
        }
        if (searchParams?.max_age && patient.age > parseInt(searchParams.max_age)) {
            return false;
        }

        // Last visit filter
        if (searchParams?.last_visit === 'recent') {
            const lastVisitDays = patient.lastVisit.includes('day') ?
                parseInt(patient.lastVisit) : 30; // Default to 30 days for non-day formats
            if (lastVisitDays > 7) return false; // Only show patients with visits within 7 days
        }

        return true;
    });

    if (viewMode === 'table') {
        return null; // Let the existing DataTable handle table view
    }

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                    Patients ({filteredPatients.length})
                </h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Add New Patient
                </button>
            </div>
            <div className="space-y-4">
                {filteredPatients.map((patient) => (
                    <PatientCard
                        key={patient.id}
                        patient={patient}
                        onSelect={onPatientSelect}
                    />
                ))}
            </div>
            {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No patients found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default PatientList;