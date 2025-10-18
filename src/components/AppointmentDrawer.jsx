import React from 'react';
import { Clock, User, Stethoscope, Calendar, FileText, Phone, Mail, X, Edit, CheckCircle, AlertCircle } from 'lucide-react';

const AppointmentDrawer = ({ appointment, onClose }) => {
    if (!appointment) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'scheduled': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="w-4 h-4" />;
            case 'in-progress': return <Clock className="w-4 h-4" />;
            case 'scheduled': return <Calendar className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'cancelled': return <AlertCircle className="w-4 h-4" />;
            default: return <Calendar className="w-4 h-4" />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div className="relative ml-auto w-96 bg-background border-l border-border shadow-xl h-full overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Appointment Details</h2>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-6">
                        {getStatusIcon(appointment.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                    </div>

                    {/* Patient Information */}
                    <div className="space-y-6">
                        {/* Patient Details */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Patient Information
                            </h4>
                            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">{appointment.patient}</h3>
                                        <p className="text-sm text-muted-foreground">Patient ID: #{appointment.id}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span>{appointment.patientPhone || '+1-555-0123'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span>{appointment.patientEmail || 'patient@email.com'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Appointment Details
                            </h4>
                            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-medium text-foreground">{appointment.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Time</p>
                                        <p className="font-medium text-foreground">{appointment.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-medium text-foreground">{appointment.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Doctor</p>
                                        <p className="font-medium text-foreground">{appointment.doctor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Treatment Information */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                                <Stethoscope className="w-4 h-4" />
                                Treatment Information
                            </h4>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                        {appointment.treatment}
                                    </div>
                                </div>
                                {appointment.notes && (
                                    <div className="text-sm text-muted-foreground">
                                        <strong>Notes:</strong> {appointment.notes}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground">Additional Information</h4>
                            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created:</span>
                                    <span className="text-foreground">{appointment.createdAt || 'Today'}</span>
                                </div>
                                {appointment.lastModified && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Last Modified:</span>
                                        <span className="text-foreground">{appointment.lastModified}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Appointment ID:</span>
                                    <span className="text-foreground font-mono">#{appointment.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4 border-t border-border">
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                                    <CheckCircle className="w-4 h-4" />
                                    Complete
                                </button>
                            </div>
                            <button className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
                                Cancel Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDrawer;