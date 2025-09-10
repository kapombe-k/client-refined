import React from 'react';
import { Clock, User, Stethoscope, Calendar, FileText, Phone, Mail } from 'lucide-react';

const AppointmentCard = ({ appointment, onSelect }) => (
    <div
        onClick={() => onSelect(appointment)}
        className="bg-background p-4 rounded-lg border border-border cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
    >
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.patientPhone || '+1-555-0123'}</p>
                </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'
            }`}>
                {appointment.status}
            </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Stethoscope className="w-4 h-4" />
                <span>{appointment.doctor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{appointment.duration}</span>
            </div>
        </div>

        <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Stethoscope className="w-4 h-4" />
                {appointment.treatment}
            </div>
        </div>

        {appointment.notes && (
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Created: {appointment.createdAt || 'Today'}</span>
                {appointment.lastModified && <span>Modified: {appointment.lastModified}</span>}
            </div>
            <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    </div>
);

const AppointmentList = ({ onAppointmentSelect, searchParams }) => {
    // Enhanced mock appointments data
    const appointments = [
        {
            id: 1,
            patient: 'John Smith',
            patientPhone: '+1-555-0123',
            patientEmail: 'john.smith@email.com',
            time: '9:00 AM',
            date: 'Jan 15, 2024',
            doctor: 'Dr. Smith',
            treatment: 'Dental Cleaning',
            status: 'confirmed',
            duration: '30 min',
            notes: 'Regular checkup and cleaning',
            createdAt: 'Jan 10, 2024',
            lastModified: 'Jan 14, 2024'
        },
        {
            id: 2,
            patient: 'Sarah Johnson',
            patientPhone: '+1-555-0124',
            patientEmail: 'sarah.johnson@email.com',
            time: '10:30 AM',
            date: 'Jan 15, 2024',
            doctor: 'Dr. Johnson',
            treatment: 'Cavity Filling',
            status: 'in-progress',
            duration: '45 min',
            notes: 'Emergency procedure - patient in pain',
            createdAt: 'Jan 14, 2024',
            lastModified: 'Jan 15, 2024'
        },
        {
            id: 3,
            patient: 'Mike Davis',
            patientPhone: '+1-555-0125',
            patientEmail: 'mike.davis@email.com',
            time: '11:15 AM',
            date: 'Jan 15, 2024',
            doctor: 'Dr. Davis',
            treatment: 'Root Canal',
            status: 'scheduled',
            duration: '90 min',
            notes: 'Patient experiencing severe tooth pain',
            createdAt: 'Jan 13, 2024'
        },
        {
            id: 4,
            patient: 'Emma Wilson',
            patientPhone: '+1-555-0126',
            patientEmail: 'emma.wilson@email.com',
            time: '2:00 PM',
            date: 'Jan 15, 2024',
            doctor: 'Dr. Smith',
            treatment: 'Consultation',
            status: 'scheduled',
            duration: '15 min',
            notes: 'New patient consultation',
            createdAt: 'Jan 15, 2024'
        },
        {
            id: 5,
            patient: 'David Brown',
            patientPhone: '+1-555-0127',
            patientEmail: 'david.brown@email.com',
            time: '3:30 PM',
            date: 'Jan 15, 2024',
            doctor: 'Dr. Johnson',
            treatment: 'X-Ray',
            status: 'scheduled',
            duration: '20 min',
            notes: 'Follow-up on previous treatment',
            createdAt: 'Jan 12, 2024'
        },
        {
            id: 6,
            patient: 'Lisa Anderson',
            patientPhone: '+1-555-0128',
            patientEmail: 'lisa.anderson@email.com',
            time: '4:00 PM',
            date: 'Jan 15, 2024',
            doctor: 'Dr. Davis',
            treatment: 'Dental Cleaning',
            status: 'confirmed',
            duration: '30 min',
            notes: 'Routine cleaning appointment',
            createdAt: 'Jan 8, 2024',
            lastModified: 'Jan 14, 2024'
        }
    ];

    // Filter appointments based on search params
    const filteredAppointments = appointments.filter(appointment => {
        if (searchParams?.q) {
            const query = searchParams.q.toLowerCase();
            return appointment.patient.toLowerCase().includes(query) ||
                   appointment.doctor.toLowerCase().includes(query) ||
                   appointment.treatment.toLowerCase().includes(query) ||
                   appointment.patientPhone.includes(query);
        }

        if (searchParams?.patient_name && !appointment.patient.toLowerCase().includes(searchParams.patient_name.toLowerCase())) {
            return false;
        }
        if (searchParams?.doctor_name && appointment.doctor !== searchParams.doctor_name) {
            return false;
        }
        if (searchParams?.status && appointment.status !== searchParams.status) {
            return false;
        }
        if (searchParams?.treatment && appointment.treatment.toLowerCase().replace(/\s+/g, '-').includes(searchParams.treatment)) {
            return false;
        }

        return true;
    });

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Appointments ({filteredAppointments.length})
                    </h3>
                    <p className="text-sm text-muted-foreground">Manage and track all appointments</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                        <span>Confirmed: {filteredAppointments.filter(a => a.status === 'confirmed').length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                        <span>Scheduled: {filteredAppointments.filter(a => a.status === 'scheduled').length}</span>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                        Export List
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onSelect={onAppointmentSelect}
                    />
                ))}
            </div>

            {filteredAppointments.length === 0 && (
                <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">No appointments found</h4>
                    <p className="text-muted-foreground">Try adjusting your search criteria or create a new appointment.</p>
                </div>
            )}
        </div>
    );
};

export default AppointmentList;