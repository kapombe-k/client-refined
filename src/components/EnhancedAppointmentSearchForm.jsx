import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Calendar, Clock, User, Stethoscope } from 'lucide-react';

const EnhancedAppointmentSearchForm = ({ resource, onSearch }) => {
    const [searchParams, setSearchParams] = useState({});
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== searchParams.q) {
                handleSearch({ ...searchParams, q: searchQuery });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newParams = { ...searchParams, [name]: value };
        setSearchParams(newParams);

        // Update active filters count
        const activeCount = Object.values(newParams).filter(val =>
            val !== '' && val !== null && val !== undefined
        ).length;
        setActiveFilters(newParams);
    };

    const handleSearch = (params) => {
        // Remove empty values
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );
        onSearch(filteredParams);
    };

    const handleClear = () => {
        setSearchParams({});
        setSearchQuery('');
        setActiveFilters([]);
        onSearch({});
    };

    const handleQuickFilter = (filterType, value) => {
        const newParams = { ...searchParams, [filterType]: value };
        setSearchParams(newParams);
        handleSearch(newParams);
    };

    const removeFilter = (filterKey) => {
        const newParams = { ...searchParams };
        delete newParams[filterKey];
        setSearchParams(newParams);
        handleSearch(newParams);
    };

    const getActiveFiltersCount = () => {
        return Object.values(searchParams).filter(val =>
            val !== '' && val !== null && val !== undefined
        ).length;
    };

    const renderAdvancedFilters = () => {
        if (resource === 'appointments') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Patient Name</label>
                        <input
                            type="text"
                            name="patient_name"
                            placeholder="Enter patient name"
                            value={searchParams.patient_name || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Doctor</label>
                        <select
                            name="doctor_name"
                            value={searchParams.doctor_name || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Doctors</option>
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Dr. Johnson">Dr. Johnson</option>
                            <option value="Dr. Davis">Dr. Davis</option>
                            <option value="Dr. Wilson">Dr. Wilson</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <select
                            name="status"
                            value={searchParams.status || ''}
                            onChange={handleInputChange}
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Treatment Type</label>
                        <select
                            name="treatment"
                            value={searchParams.treatment || ''}
                            onChange={handleInputChange}
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Date Range</label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                name="start_date"
                                value={searchParams.start_date || ''}
                                onChange={handleInputChange}
                                className="w-1/2 border border-input bg-background rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="date"
                                name="end_date"
                                value={searchParams.end_date || ''}
                                onChange={handleInputChange}
                                className="w-1/2 border border-input bg-background rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Time Range</label>
                        <div className="flex gap-2">
                            <input
                                type="time"
                                name="start_time"
                                value={searchParams.start_time || ''}
                                onChange={handleInputChange}
                                className="w-1/2 border border-input bg-background rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="time"
                                name="end_time"
                                value={searchParams.end_time || ''}
                                onChange={handleInputChange}
                                className="w-1/2 border border-input bg-background rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-background border border-border rounded-lg shadow-sm p-6 mb-6">
            {/* Main Search Bar */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search appointments by patient name, doctor, or treatment..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                        showAdvancedFilters
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                >
                    <Filter className="w-4 h-4" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                        <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                            {getActiveFiltersCount()}
                        </span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                </button>

                {getActiveFiltersCount() > 0 && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear All
                    </button>
                )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => handleQuickFilter('status', 'scheduled')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.status === 'scheduled'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Scheduled
                </button>
                <button
                    onClick={() => handleQuickFilter('status', 'in-progress')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.status === 'in-progress'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    In Progress
                </button>
                <button
                    onClick={() => handleQuickFilter('status', 'completed')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.status === 'completed'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Completed
                </button>
                <button
                    onClick={() => handleQuickFilter('treatment', 'cleaning')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.treatment === 'cleaning'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Cleanings
                </button>
                <button
                    onClick={() => handleQuickFilter('doctor_name', 'Dr. Smith')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.doctor_name === 'Dr. Smith'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Dr. Smith
                </button>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(searchParams).map(([key, value]) => {
                        if (!value || value === '') return null;
                        return (
                            <div
                                key={key}
                                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                                <span className="capitalize">{key.replace('_', ' ')}: {value}</span>
                                <button
                                    onClick={() => removeFilter(key)}
                                    className="hover:bg-primary/20 rounded-full p-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Advanced Filters */}
            {showAdvancedFilters && renderAdvancedFilters()}
        </div>
    );
};

export default EnhancedAppointmentSearchForm;