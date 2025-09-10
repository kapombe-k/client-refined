import React, { useState } from 'react';
import EnhancedAnalyticsFilters from '../components/EnhancedAnalyticsFilters';
import EnhancedCharts from '../components/EnhancedCharts';
import InvoiceCard from '../components/InvoiceCard';
import PaymentStatus from '../components/PaymentStatus';
import TransactionList from '../components/TransactionList';
import { BarChart3, FileText, CreditCard, Receipt, Download, Share, Settings } from 'lucide-react';

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [filters, setFilters] = useState({});

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'financial', label: 'Financial', icon: CreditCard },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'transactions', label: 'Transactions', icon: Receipt }
    ];

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <EnhancedCharts />
                    </div>
                );
            case 'financial':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <PaymentStatus />
                            <InvoiceCard />
                        </div>
                        <TransactionList />
                    </div>
                );
            case 'invoices':
                return (
                    <div className="space-y-6">
                        <InvoiceCard />
                        <div className="bg-background border border-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Invoice Analytics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">85%</p>
                                    <p className="text-sm text-muted-foreground">Payment Rate</p>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">12 days</p>
                                    <p className="text-sm text-muted-foreground">Avg Payment Time</p>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600">$2,340</p>
                                    <p className="text-sm text-muted-foreground">Outstanding</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'transactions':
                return (
                    <div className="space-y-6">
                        <TransactionList />
                    </div>
                );
            default:
                return <EnhancedCharts />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
                    <p className="text-sm text-muted-foreground">Comprehensive insights into clinic performance</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                        <Share className="w-4 h-4" />
                        Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </div>
            </div>

            {/* Filters */}
            <EnhancedAnalyticsFilters onFiltersChange={handleFiltersChange} />

            {/* Tab Navigation */}
            <div className="bg-background border border-border rounded-lg shadow-sm">
                <div className="flex border-b border-border">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                                    activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">$328K</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">845</p>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-xs text-green-600 mt-1">+8.2% from last month</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">1,210</p>
                    <p className="text-sm text-muted-foreground">Appointments</p>
                    <p className="text-xs text-green-600 mt-1">+15.3% from last month</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">4.5</p>
                    <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                    <p className="text-xs text-green-600 mt-1">+0.3 from last month</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
