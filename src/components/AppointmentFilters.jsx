import React, { useState } from 'react';
import { Filter, X, Calendar, Clock, Stethoscope, User } from 'lucide-react';

const AppointmentFilters = ({ onFiltersChange }) => {
    const [filters, setFilters] = useState({
        date: '',
        doctor: '',
        status: '',
        treatment: '',
        timeRange: '',
        priority: ''
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
            date: '',
            doctor: '',
            status: '',
            treatment: '',
            timeRange: '',
            priority: ''
        };
        setFilters(clearedFilters);
        if (onFiltersChange) {
            onFiltersChange(clearedFilters);
        }
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(val => val !== '').length;
    };

    const quickFilters = [
        { key: 'status', value: 'scheduled', label: 'Scheduled', color: 'bg-yellow-100 text-yellow-800' },
        { key: 'status', value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
        { key: 'status', value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
        { key: 'priority', value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
        { key: 'treatment', value: 'cleaning', label: 'Cleanings', color: 'bg-purple-100 text-purple-800' },
        { key: 'timeRange', value: 'today', label: 'Today', color: 'bg-indigo-100 text-indigo-800' }
    ];

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-4 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Filters</span>
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
                {quickFilters.map((filter) => (
                    <button
                        key={`${filter.key}-${filter.value}`}
                        onClick={() => handleFilterChange(filter.key, filter.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            filters[filter.key] === filter.value
                                ? filter.color.replace('100', '200')
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(filters).map(([key, value]) => {
                        if (!value) return null;
                        return (
                            <div
                                key={key}
                                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                                <span className="capitalize">{key.replace('_', ' ')}: {value}</span>
                                <button
                                    onClick={() => handleFilterChange(key, '')}
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
                    {/* Date Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date
                        </label>
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
                    </div>

                    {/* Doctor Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <User className="w-4 h-4" />
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

                    {/* Status Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Statuses</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="no-show">No Show</option>
                        </select>
                    </div>

                    {/* Treatment Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Stethoscope className="w-4 h-4" />
                            Treatment
                        </label>
                        <select
                            value={filters.treatment}
                            onChange={(e) => handleFilterChange('treatment', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Treatments</option>
                            <option value="cleaning">Dental Cleaning</option>
                            <option value="filling">Cavity Filling</option>
                            <option value="extraction">Tooth Extraction</option>
                            <option value="root-canal">Root Canal</option>
                            <option value="checkup">Regular Checkup</option>
                            <option value="xray">X-Ray</option>
                            <option value="consultation">Consultation</option>
                        </select>
                    </div>

                    {/* Time Range Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Time Range
                        </label>
                        <select
                            value={filters.timeRange}
                            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">Any Time</option>
                            <option value="morning">Morning (9AM-12PM)</option>
                            <option value="afternoon">Afternoon (12PM-5PM)</option>
                            <option value="today">Today</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Priority</label>
                        <select
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Priorities</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentFilters;