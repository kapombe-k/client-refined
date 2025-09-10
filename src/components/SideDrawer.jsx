import React from 'react';

const SideDrawer = ({ patient, onClose }) => {
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
                        <h2 className="text-xl font-semibold text-foreground">Patient Profile</h2>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Patient Info */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">{patient.avatar || '👤'}</div>
                            <div>
                                <h3 className="text-lg font-medium text-foreground">{patient.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {patient.age} years • {patient.gender}
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground">Contact Information</h4>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Phone:</span> {patient.phone}</p>
                                <p><span className="font-medium">Email:</span> {patient.email || 'Not provided'}</p>
                                <p><span className="font-medium">Address:</span> {patient.address || 'Not provided'}</p>
                            </div>
                        </div>

                        {/* Medical Info */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground">Medical Information</h4>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                                <p><span className="font-medium">Status:</span> {patient.status}</p>
                                <p><span className="font-medium">Insurance ID:</span> {patient.insurance_id || 'Not provided'}</p>
                                <p><span className="font-medium">Insurance:</span> {patient.insurance || 'Not provided'}</p>
                            </div>
                        </div>

                        {/* Recent Treatments */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-foreground">Recent Treatments</h4>
                            <div className="space-y-2">
                                {(patient.recentTreatments || ['Dental Cleaning', 'X-Ray']).map((treatment, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                        <span className="text-sm">{treatment}</span>
                                        <span className="text-xs text-muted-foreground">2 days ago</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 pt-4 border-t border-border">
                            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                View Full Profile
                            </button>
                            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                Schedule Appointment
                            </button>
                            <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                                Edit Patient
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideDrawer;