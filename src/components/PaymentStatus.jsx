import React from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const PaymentStatus = () => {
    const statuses = [
        {
            label: 'Paid',
            count: 45,
            amount: 12500,
            color: 'bg-green-500',
            trend: '+12%',
            trendUp: true
        },
        {
            label: 'Pending',
            count: 12,
            amount: 3400,
            color: 'bg-yellow-500',
            trend: '+5%',
            trendUp: true
        },
        {
            label: 'Overdue',
            count: 3,
            amount: 1200,
            color: 'bg-red-500',
            trend: '-8%',
            trendUp: false
        }
    ];

    const totalAmount = statuses.reduce((sum, status) => sum + status.amount, 0);
    const totalCount = statuses.reduce((sum, status) => sum + status.count, 0);

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Status
                    </h3>
                    <p className="text-sm text-muted-foreground">Current billing overview</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">${totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{totalCount} transactions</p>
                </div>
            </div>

            <div className="space-y-4">
                {statuses.map((status, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${status.color}`}></div>
                                <div>
                                    <h4 className="font-medium text-foreground">{status.label}</h4>
                                    <p className="text-sm text-muted-foreground">{status.count} transactions</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-foreground">${status.amount.toLocaleString()}</p>
                                <div className={`flex items-center gap-1 text-sm ${status.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                    {status.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {status.trend}
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${status.color}`}
                                style={{ width: `${(status.amount / totalAmount) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                            <span>{((status.amount / totalAmount) * 100).toFixed(1)}% of total</span>
                            <span>${(status.amount / status.count).toFixed(0)} avg per transaction</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-4 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-green-600">{statuses[0].count}</p>
                        <p className="text-xs text-muted-foreground">Paid This Month</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">{statuses[1].count}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">{statuses[2].count}</p>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus;