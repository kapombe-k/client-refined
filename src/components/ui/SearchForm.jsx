import React, { useState } from 'react';

const SearchForm = ({ resource, onSearch }) => {
    const [searchParams, setSearchParams] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Remove empty values
        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );
        onSearch(filteredParams);
    };

    const handleClear = () => {
        setSearchParams({});
        onSearch({});
    };

    const renderSearchFields = () => {
        switch (resource) {
            case 'patients':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="q"
                                placeholder="General search..."
                                value={searchParams.q || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Patient name"
                                value={searchParams.name || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone number"
                                value={searchParams.phone || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={searchParams.email || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="insurance_id"
                                placeholder="Insurance ID"
                                value={searchParams.insurance_id || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <select
                                name="gender"
                                value={searchParams.gender || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            >
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="number"
                                name="min_age"
                                placeholder="Min age"
                                value={searchParams.min_age || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="number"
                                name="max_age"
                                placeholder="Max age"
                                value={searchParams.max_age || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>
                    </>
                );

            case 'appointments':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="q"
                                placeholder="General search..."
                                value={searchParams.q || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="patient_name"
                                placeholder="Patient name"
                                value={searchParams.patient_name || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="doctor_name"
                                placeholder="Doctor name"
                                value={searchParams.doctor_name || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="reason"
                                placeholder="Appointment reason"
                                value={searchParams.reason || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <select
                                name="status"
                                value={searchParams.status || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            >
                                <option value="">All Statuses</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no_show">No Show</option>
                            </select>
                            <input
                                type="date"
                                name="start_date"
                                value={searchParams.start_date || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="date"
                                name="end_date"
                                value={searchParams.end_date || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>
                    </>
                );

            case 'doctors':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="q"
                                placeholder="General search..."
                                value={searchParams.q || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Doctor name"
                                value={searchParams.name || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="specialty"
                                placeholder="Specialty"
                                value={searchParams.specialty || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="text"
                                name="license_number"
                                placeholder="License number"
                                value={searchParams.license_number || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="number"
                                name="min_rate"
                                placeholder="Min monthly rate"
                                value={searchParams.min_rate || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                            <input
                                type="number"
                                name="max_rate"
                                placeholder="Max monthly rate"
                                value={searchParams.max_rate || ''}
                                onChange={handleInputChange}
                                className="border border-input bg-background rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-muted/50 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Search {resource.charAt(0).toUpperCase() + resource.slice(1)}</h3>
            {renderSearchFields()}
            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchForm;