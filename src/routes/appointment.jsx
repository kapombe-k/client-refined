import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = "http://localhost:5000"; // Make sure this matches your Flask backend URL

export default function AppointmentComponent() {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        date: "",
        patient_id: "",
        doctor_id: "",
    });
    const [searchPatientId, setSearchPatientId] = useState("");
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [editAppointment, setEditAppointment] = useState(null); // State to hold appointment being edited

    // Fetch all appointments when the component mounts
    useEffect(() => {
        fetchAllAppointments();
    }, []);

    // Function to fetch all appointments from the backend
    const fetchAllAppointments = async () => {
        try {
            const response = await axios.get(`${backendUrl}/appointments`); // This endpoint likely needs to be added to app.py
            setAppointments(response.data);
        } catch (error) {
            console.error(
                "Error fetching appointments",
                error
            );
            alert(
                "Failed to fetch appointments."
            );
            setAppointments([]); // Clear appointments if fetching fails
        }
    };

    // Handle input changes for new appointment form
    const handleNewAppointmentChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment((prev) => ({ ...prev, [name]: value }));
    };

    // Handle input changes for editing appointment form
    const handleEditAppointmentChange = (e) => {
        const { name, value } = e.target;
        setEditAppointment((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new appointment
    const addAppointment = async (e) => {
        e.preventDefault();
        try {
            // Ensure date is in YYYY-MM-DD format
            const formattedAppointment = {
                ...newAppointment,
                date: newAppointment.date,
            };
            await axios.post(`${backendUrl}/appointments`, formattedAppointment);
            alert("Appointment added successfully!");
            setNewAppointment({ date: "", patient_id: "", doctor_id: "" }); // Clear form
            fetchAllAppointments(); // Refresh the list
        } catch (error) {
            console.error("Error adding appointment:", error);
            alert(
                `Failed to add appointment`
            );
        }
    };

    // Search for appointments by Patient ID
    const searchAppointmentsByPatient = async () => {
        if (!searchPatientId) {
            alert("Please enter a Patient ID to search for appointments.");
            return;
        }
        try {
            // You'll likely need an endpoint like /patients/{id}/appointments to get a patient's appointments
            const response = await axios.get(
                `${backendUrl}/patients/${searchPatientId}/appointments`
            ); // Needs to be added to backend
            setPatientAppointments(response.data);
        } catch (error) {
            console.error("Error searching appointments:", error);
            setPatientAppointments([]);
            alert(
                `No appointments found for patient with ID ${searchPatientId}. 
                (You might need to implement /patients/{id}/appointments endpoint in your backend)`
            );
            // Fallback for demonstration if the specific patient appointments endpoint isn't ready
            const filteredAppointments = appointments.filter(
                (appt) => appt.patient_id === parseInt(searchPatientId)
            );
            setPatientAppointments(filteredAppointments);
            if (filteredAppointments.length === 0) {
                alert(
                    `No appointments found for patient with ID ${searchPatientId} in the current fetched list.`
                );
            }
        }
    };

    // Set an appointment for editing
    const initiateEdit = (appointment) => {
        setEditAppointment({
            ...appointment,
            date: appointment.date.split("T")[0],
        }); // Format date for input type="date"
    };

    // Update an existing appointment
    const updateAppointment = async (e) => {
        e.preventDefault();
        if (!editAppointment) return;

        try {
            // Ensure date is in YYYY-MM-DD format
            const formattedAppointment = {
                ...editAppointment,
                date: editAppointment.date,
            };
            await axios.patch(
                `${backendUrl}/appointments/${editAppointment.id}`,
                formattedAppointment
            );
            alert("Appointment updated successfully!");
            setEditAppointment(null); // Clear edit form
            fetchAllAppointments(); // Refresh the list
            setPatientAppointments([]); // Clear patient specific search
        } catch (error) {
            console.error("Error updating appointment:", error);
            alert(
                `Failed to update appointment: ${error.response?.data?.detail || error.message
                }`
            );
        }
    };

    // Delete an appointment
    const deleteAppointment = async (id) => {
        if (
            window.confirm(
                `Are you sure you want to delete appointment with ID: ${id}?`
            )
        ) {
            try {
                await axios.delete(`${backendUrl}/appointments/${id}`);
                alert("Appointment deleted successfully!");
                fetchAllAppointments(); // Refresh the list
                setPatientAppointments([]); // Clear patient specific search
            } catch (error) {
                console.error("Error deleting appointment:", error);
                alert(
                    `Failed to delete appointment: ${error.response?.data?.detail || error.message
                    }`
                );
            }
        }
    };
    
    return (
        <>
        <div style={styles.container}>
            <h2>Appointment Management</h2>
            <p>
                Schedule, view, update, and cancel patient appointments with doctors.
            </p>

            {/* Search Appointments by Patient ID */}
            <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-purple-800 mb-6">Search Appointments by Patient ID</h3>
                <input
                    type="number"
                    placeholder="Patient ID"
                    value={searchPatientId}
                    onChange={(e) => setSearchPatientId(e.target.value)}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                />
                    <button onClick={searchAppointmentsByPatient} className="w-full p-4 bg-purple-600 text-white font-medium rounded-xl 
                  hover:bg-purple-700 active:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  transition-all duration-200 shadow-md hover:shadow-lg">
                    Search Appointments
                </button>
            </div>

            {/* Add New Appointment */}
            <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                <h3>Add New Appointment</h3>
                <form onSubmit={addAppointment} style={styles.form}>
                    <input
                        type="date"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleNewAppointmentChange}
                        required
                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                    />
                    <input
                        type="number"
                        name="patient_id"
                        placeholder="Patient ID"
                        value={newAppointment.patient_id}
                        onChange={handleNewAppointmentChange}
                        required
                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                    />
                    <input
                        type="number"
                        name="doctor_id"
                        placeholder="Doctor ID"
                        value={newAppointment.doctor_id}
                        onChange={handleNewAppointmentChange}
                        required
                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                    />
                        <button type="submit" className="w-full p-4 bg-purple-600 text-white font-medium rounded-xl 
                  hover:bg-purple-700 active:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  transition-all duration-200 shadow-md hover:shadow-lg">
                        Add Appointment
                    </button>
                </form>
            </div>


                {patientAppointments.length > 0 && (
                    <div style={styles.searchResult}>
                        <h4>Appointments for Patient ID: {searchPatientId}</h4>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Appointment ID</th>
                                    <th style={styles.th}>Date</th>
                                    <th style={styles.th}>Doctor ID</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientAppointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td style={styles.td}>{appointment.id}</td>
                                        <td style={styles.td}>
                                            {new Date(appointment.date).toLocaleDateString()}
                                        </td>
                                        <td style={styles.td}>{appointment.doctor_id}</td>
                                        <td style={styles.td}>
                                            <button
                                                onClick={() => initiateEdit(appointment)}
                                                style={styles.editButton}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteAppointment(appointment.id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        
            <div>
                {/* Edit Appointment Form */}
            {editAppointment && (
                <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                    <h3>Edit Appointment (ID: {editAppointment.id})</h3>
                    <form onSubmit={updateAppointment} style={styles.form}>
                        <input
                            type="date"
                            name="date"
                            value={editAppointment.date}
                            onChange={handleEditAppointmentChange}
                            required
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                        />
                        <input
                            type="number"
                            name="patient_id"
                            placeholder="Patient ID"
                            value={editAppointment.patient_id}
                            onChange={handleEditAppointmentChange}
                            required
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                        />
                        <input
                            type="number"
                            name="doctor_id"
                            placeholder="Doctor ID"
                            value={editAppointment.doctor_id}
                            onChange={handleEditAppointmentChange}
                            required
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                    hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                    transition-all duration-200"
                        />
                        <button type="submit" style={styles.button}>
                            Update Appointment
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditAppointment(null)}
                            style={{ ...styles.button, backgroundColor: "#6c757d" }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            </div>

            {/* All Appointments List */}
            <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                <h3>All Appointments</h3>
                {appointments.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Patient ID</th>
                                <th style={styles.th}>Doctor ID</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td style={styles.td}>{appointment.id}</td>
                                    <td style={styles.td}>
                                        {new Date(appointment.date).toLocaleDateString()}
                                    </td>
                                    <td style={styles.td}>{appointment.patient_id}</td>
                                    <td style={styles.td}>{appointment.doctor_id}</td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => initiateEdit(appointment)}
                                            style={styles.editButton}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteAppointment(appointment.id)}
                                            style={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>
                        No appointments found.
                    </p>
                )}
            </div>
        </ >
    );
}

// Basic inline styles (reused from previous components)
const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    section: {
        marginBottom: "30px",
        padding: "20px",
        border: "1px solid #dee2e6",
        borderRadius: "5px",
        backgroundColor: "#fff",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ced4da",
        width: "calc(100% - 22px)",
    },
    button: {
        padding: "10px 15px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        alignSelf: "flex-start",
        marginTop: "10px",
    },
    editButton: {
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#ffc107",
        color: "black",
        cursor: "pointer",
        marginRight: "5px",
    },
    deleteButton: {
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#dc3545",
        color: "white",
        cursor: "pointer",
    },
    searchResult: {
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #007bff",
        borderRadius: "5px",
        backgroundColor: "#e9f7ff",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
    },
    th: {
        border: "1px solid #dee2e6",
        padding: "12px",
        textAlign: "left",
        backgroundColor: "#e9ecef",
    },
    td: {
        border: "1px solid #dee2e6",
        padding: "12px",
        textAlign: "left",
    },
};


