import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Calendar, User, Phone } from 'lucide-react';

const EnhancedSearchForm = ({ resource, onSearch }) => {
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
        if (resource === 'patients') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Patient Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter patient name"
                            value={searchParams.name || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={searchParams.phone || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={searchParams.email || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Gender</label>
                        <select
                            name="gender"
                            value={searchParams.gender || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        >
                            <option value="">All Genders</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Age Range</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="min_age"
                                placeholder="Min"
                                value={searchParams.min_age || ''}
                                onChange={handleInputChange}
                                className="w-1/2 border border-input bg-background rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="number"
                                name="max_age"
                                placeholder="Max"
                                value={searchParams.max_age || ''}
                                onChange={handleInputChange}
                                className="w-1/2 border border-input bg-background rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Insurance ID</label>
                        <input
                            type="text"
                            name="insurance_id"
                            placeholder="Enter insurance ID"
                            value={searchParams.insurance_id || ''}
                            onChange={handleInputChange}
                            className="w-full border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
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
                        placeholder="Search patients by name, phone, or email..."
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
                    onClick={() => handleQuickFilter('status', 'active')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.status === 'active'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Active Patients
                </button>
                <button
                    onClick={() => handleQuickFilter('gender', 'female')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.gender === 'female'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Female
                </button>
                <button
                    onClick={() => handleQuickFilter('gender', 'male')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.gender === 'male'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Male
                </button>
                <button
                    onClick={() => handleQuickFilter('last_visit', 'recent')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        searchParams.last_visit === 'recent'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Recent Visits
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

export default EnhancedSearchForm;