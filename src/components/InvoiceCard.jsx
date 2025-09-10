import React from 'react';
import { FileText, DollarSign, Calendar, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const InvoiceCard = () => {
    const invoices = [
        {
            id: 'INV-2024-001',
            patient: 'John Smith',
            patientId: 'P001',
            amount: 150,
            status: 'paid',
            date: 'Jan 15, 2024',
            dueDate: 'Jan 15, 2024',
            treatment: 'Dental Cleaning',
            doctor: 'Dr. Smith'
        },
        {
            id: 'INV-2024-002',
            patient: 'Sarah Johnson',
            patientId: 'P002',
            amount: 200,
            status: 'pending',
            date: 'Jan 14, 2024',
            dueDate: 'Jan 21, 2024',
            treatment: 'Cavity Filling',
            doctor: 'Dr. Johnson'
        },
        {
            id: 'INV-2024-003',
            patient: 'Mike Davis',
            patientId: 'P003',
            amount: 800,
            status: 'overdue',
            date: 'Jan 10, 2024',
            dueDate: 'Jan 17, 2024',
            treatment: 'Root Canal',
            doctor: 'Dr. Davis'
        },
        {
            id: 'INV-2024-004',
            patient: 'Emma Wilson',
            patientId: 'P004',
            amount: 75,
            status: 'paid',
            date: 'Jan 12, 2024',
            dueDate: 'Jan 12, 2024',
            treatment: 'Consultation',
            doctor: 'Dr. Smith'
        },
        {
            id: 'INV-2024-005',
            patient: 'David Brown',
            patientId: 'P005',
            amount: 300,
            status: 'pending',
            date: 'Jan 13, 2024',
            dueDate: 'Jan 20, 2024',
            treatment: 'X-Ray & Checkup',
            doctor: 'Dr. Johnson'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'overdue': return <AlertCircle className="w-4 h-4 text-red-600" />;
            default: return <FileText className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-50 border-green-200';
            case 'pending': return 'bg-yellow-50 border-yellow-200';
            case 'overdue': return 'bg-red-50 border-red-200';
            default: return 'bg-muted border-border';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'paid': return 'text-green-800';
            case 'pending': return 'text-yellow-800';
            case 'overdue': return 'text-red-800';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Recent Invoices
                    </h3>
                    <p className="text-sm text-muted-foreground">Latest billing activity</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Paid: {invoices.filter(inv => inv.status === 'paid').length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Pending: {invoices.filter(inv => inv.status === 'pending').length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Overdue: {invoices.filter(inv => inv.status === 'overdue').length}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {invoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 ${getStatusColor(invoice.status)}`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {getStatusIcon(invoice.status)}
                                <div>
                                    <h4 className="font-medium text-foreground">{invoice.id}</h4>
                                    <p className="text-sm text-muted-foreground">Patient: {invoice.patient}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-foreground">${invoice.amount}</p>
                                <p className={`text-sm font-medium ${getStatusTextColor(invoice.status)}`}>
                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Due: {invoice.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{invoice.doctor}</span>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                <strong>Treatment:</strong> {invoice.treatment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Outstanding</span>
                    <span className="font-semibold text-foreground">$1,100</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Overdue Amount</span>
                    <span className="font-semibold text-red-600">$800</span>
                </div>
            </div>
        </div>
    );
};

export default InvoiceCard;