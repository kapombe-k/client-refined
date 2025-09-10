import React, { useState } from 'react';
import { Filter, X, ChevronDown, Calendar, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

const EnhancedAnalyticsFilters = ({ onFiltersChange }) => {
    const [filters, setFilters] = useState({
        dateRange: 'last30days',
        reportType: 'overview',
        doctor: '',
        department: '',
        metric: 'revenue'
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (onFiltersChange) {
            onFiltersChange(newFilters);
        }
    };

    const clearFilters = () => {
        const clearedFilters = {
            dateRange: 'last30days',
            reportType: 'overview',
            doctor: '',
            department: '',
            metric: 'revenue'
        };
        setFilters(clearedFilters);
        if (onFiltersChange) {
            onFiltersChange(clearedFilters);
        }
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(val => val !== '' && val !== 'last30days' && val !== 'overview' && val !== 'revenue').length;
    };

    const quickFilters = [
        { key: 'dateRange', value: 'last7days', label: 'Last 7 Days', icon: Calendar },
        { key: 'dateRange', value: 'last30days', label: 'Last 30 Days', icon: Calendar },
        { key: 'dateRange', value: 'last3months', label: 'Last 3 Months', icon: Calendar },
        { key: 'reportType', value: 'revenue', label: 'Revenue', icon: DollarSign },
        { key: 'reportType', value: 'patients', label: 'Patients', icon: Users },
        { key: 'reportType', value: 'performance', label: 'Performance', icon: TrendingUp }
    ];

    const reportTypes = [
        { value: 'overview', label: 'Overview Dashboard', icon: BarChart3 },
        { value: 'revenue', label: 'Revenue Analysis', icon: DollarSign },
        { value: 'patients', label: 'Patient Analytics', icon: Users },
        { value: 'performance', label: 'Performance Metrics', icon: TrendingUp },
        { value: 'treatments', label: 'Treatment Reports', icon: BarChart3 },
        { value: 'appointments', label: 'Appointment Analytics', icon: Calendar }
    ];

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Analytics Filters</span>
                    {getActiveFiltersCount() > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            {getActiveFiltersCount()}
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {quickFilters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                        <button
                            key={`${filter.key}-${filter.value}`}
                            onClick={() => handleFilterChange(filter.key, filter.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                                filters[filter.key] === filter.value
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            <Icon className="w-3 h-3" />
                            {filter.label}
                        </button>
                    );
                })}
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(filters).map(([key, value]) => {
                        if (!value || (key === 'dateRange' && value === 'last30days') ||
                            (key === 'reportType' && value === 'overview') ||
                            (key === 'metric' && value === 'revenue')) return null;
                        return (
                            <div
                                key={key}
                                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                                <span className="capitalize">{key.replace('_', ' ')}: {value}</span>
                                <button
                                    onClick={() => handleFilterChange(key, key === 'dateRange' ? 'last30days' : key === 'reportType' ? 'overview' : '')}
                                    className="hover:bg-primary/20 rounded-full p-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        );
                    })}
                    <button
                        onClick={clearFilters}
                        className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Advanced Filters */}
            {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                    {/* Date Range */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date Range
                        </label>
                        <select
                            value={filters.dateRange}
                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="last30days">Last 30 Days</option>
                            <option value="last3months">Last 3 Months</option>
                            <option value="last6months">Last 6 Months</option>
                            <option value="lastyear">Last Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    {/* Report Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Report Type
                        </label>
                        <select
                            value={filters.reportType}
                            onChange={(e) => handleFilterChange('reportType', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            {reportTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Doctor Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Doctor
                        </label>
                        <select
                            value={filters.doctor}
                            onChange={(e) => handleFilterChange('doctor', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Doctors</option>
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Dr. Johnson">Dr. Johnson</option>
                            <option value="Dr. Davis">Dr. Davis</option>
                            <option value="Dr. Wilson">Dr. Wilson</option>
                        </select>
                    </div>

                    {/* Department Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Department</label>
                        <select
                            value={filters.department}
                            onChange={(e) => handleFilterChange('department', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Departments</option>
                            <option value="general">General Dentistry</option>
                            <option value="orthodontics">Orthodontics</option>
                            <option value="oral-surgery">Oral Surgery</option>
                            <option value="pediatric">Pediatric Dentistry</option>
                        </select>
                    </div>

                    {/* Metric Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Primary Metric
                        </label>
                        <select
                            value={filters.metric}
                            onChange={(e) => handleFilterChange('metric', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="revenue">Revenue</option>
                            <option value="patients">Patient Count</option>
                            <option value="appointments">Appointments</option>
                            <option value="treatments">Treatments</option>
                            <option value="satisfaction">Patient Satisfaction</option>
                        </select>
                    </div>

                    {/* Generate Report Button */}
                    <div className="flex items-end">
                        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                            Generate Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnhancedAnalyticsFilters;