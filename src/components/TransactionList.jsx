import React, { useState } from 'react';
import { Receipt, Download, Search, Filter, ArrowUpDown, Eye, CreditCard, DollarSign, Calendar, User } from 'lucide-react';

const TransactionList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    const transactions = [
        {
            id: 'TXN-2024-001',
            patient: 'John Smith',
            patientId: 'P001',
            amount: 150,
            type: 'Payment',
            method: 'Credit Card',
            date: 'Jan 15, 2024',
            time: '2:30 PM',
            status: 'completed',
            description: 'Dental Cleaning - Payment',
            doctor: 'Dr. Smith'
        },
        {
            id: 'TXN-2024-002',
            patient: 'Sarah Johnson',
            patientId: 'P002',
            amount: 200,
            type: 'Payment',
            method: 'Cash',
            date: 'Jan 14, 2024',
            time: '11:15 AM',
            status: 'completed',
            description: 'Cavity Filling - Payment',
            doctor: 'Dr. Johnson'
        },
        {
            id: 'TXN-2024-003',
            patient: 'Mike Davis',
            patientId: 'P003',
            amount: 800,
            type: 'Invoice',
            method: 'Insurance',
            date: 'Jan 13, 2024',
            time: '9:45 AM',
            status: 'pending',
            description: 'Root Canal Treatment',
            doctor: 'Dr. Davis'
        },
        {
            id: 'TXN-2024-004',
            patient: 'Emma Wilson',
            patientId: 'P004',
            amount: 75,
            type: 'Payment',
            method: 'Credit Card',
            date: 'Jan 12, 2024',
            time: '4:20 PM',
            status: 'completed',
            description: 'Consultation - Payment',
            doctor: 'Dr. Smith'
        },
        {
            id: 'TXN-2024-005',
            patient: 'David Brown',
            patientId: 'P005',
            amount: 300,
            type: 'Payment',
            method: 'Bank Transfer',
            date: 'Jan 11, 2024',
            time: '1:10 PM',
            status: 'completed',
            description: 'X-Ray & Checkup - Payment',
            doctor: 'Dr. Johnson'
        },
        {
            id: 'TXN-2024-006',
            patient: 'Lisa Anderson',
            patientId: 'P006',
            amount: 125,
            type: 'Refund',
            method: 'Credit Card',
            date: 'Jan 10, 2024',
            time: '3:45 PM',
            status: 'completed',
            description: 'Overpayment Refund',
            doctor: 'Dr. Davis'
        }
    ];

    const filteredTransactions = transactions.filter(transaction =>
        transaction.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
            case 'amount':
                aValue = a.amount;
                bValue = b.amount;
                break;
            case 'date':
                aValue = new Date(`${a.date} ${a.time}`);
                bValue = new Date(`${b.date} ${b.time}`);
                break;
            case 'patient':
                aValue = a.patient;
                bValue = b.patient;
                break;
            default:
                aValue = a.id;
                bValue = b.id;
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Payment': return <CreditCard className="w-4 h-4 text-green-600" />;
            case 'Invoice': return <Receipt className="w-4 h-4 text-blue-600" />;
            case 'Refund': return <DollarSign className="w-4 h-4 text-orange-600" />;
            default: return <Receipt className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('desc');
        }
    };

    const totalAmount = sortedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Receipt className="w-5 h-5" />
                        Transaction History
                    </h3>
                    <p className="text-sm text-muted-foreground">Complete financial transaction log</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-lg font-bold text-foreground">${totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{sortedTransactions.length} transactions</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-2">
                                <button
                                    onClick={() => handleSort('id')}
                                    className="flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                    Transaction ID
                                    <ArrowUpDown className="w-3 h-3" />
                                </button>
                            </th>
                            <th className="text-left py-3 px-2">
                                <button
                                    onClick={() => handleSort('patient')}
                                    className="flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                    Patient
                                    <ArrowUpDown className="w-3 h-3" />
                                </button>
                            </th>
                            <th className="text-left py-3 px-2">Type</th>
                            <th className="text-left py-3 px-2">
                                <button
                                    onClick={() => handleSort('amount')}
                                    className="flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                    Amount
                                    <ArrowUpDown className="w-3 h-3" />
                                </button>
                            </th>
                            <th className="text-left py-3 px-2">Method</th>
                            <th className="text-left py-3 px-2">
                                <button
                                    onClick={() => handleSort('date')}
                                    className="flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                    Date
                                    <ArrowUpDown className="w-3 h-3" />
                                </button>
                            </th>
                            <th className="text-left py-3 px-2">Status</th>
                            <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                <td className="py-4 px-2">
                                    <div className="flex items-center gap-2">
                                        {getTypeIcon(transaction.type)}
                                        <span className="font-medium text-foreground">{transaction.id}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-2">
                                    <div>
                                        <p className="font-medium text-foreground">{transaction.patient}</p>
                                        <p className="text-xs text-muted-foreground">{transaction.patientId}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-2">
                                    <span className="text-sm text-muted-foreground">{transaction.type}</span>
                                </td>
                                <td className="py-4 px-2">
                                    <span className="font-medium text-foreground">${transaction.amount}</span>
                                </td>
                                <td className="py-4 px-2">
                                    <span className="text-sm text-muted-foreground">{transaction.method}</span>
                                </td>
                                <td className="py-4 px-2">
                                    <div>
                                        <p className="text-sm text-foreground">{transaction.date}</p>
                                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="py-4 px-2">
                                    <button className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                                        <Eye className="w-3 h-3" />
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sortedTransactions.length === 0 && (
                <div className="text-center py-12">
                    <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">No transactions found</h4>
                    <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                </div>
            )}

            {/* Summary */}
            <div className="mt-6 pt-4 border-t border-border">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-lg font-bold text-green-600">
                            {sortedTransactions.filter(t => t.status === 'completed').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-yellow-600">
                            {sortedTransactions.filter(t => t.status === 'pending').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-blue-600">
                            {sortedTransactions.filter(t => t.type === 'Payment').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Payments</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-orange-600">
                            {sortedTransactions.filter(t => t.type === 'Refund').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Refunds</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;