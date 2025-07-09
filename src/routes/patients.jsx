import { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

const backendUrl = "http://localhost:5000"; // this makes the backend url easily accessible

export default function PatientComponent() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        name: "",
        age: "",
        phone_number: "",
        address: "",
        account_type: "",
    });
    const [searchId, setSearchId] = useState("");
    const [foundPatient, setFoundPatient] = useState(null);
    const [editPatient, setEditPatient] = useState(null); // State to hold patient being edited

    // Fetch all patients when the component mounts
    useEffect(() => {
        fetchAllPatients();
    }, []);

    // Function to fetch all patients from the backend
    const fetchAllPatients = async () => {
        try {
            const response = await axios.get(`${backendUrl}/patients`);
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
            alert("Failed to fetch patients.");
        }
    };

    // Handle input changes for new patient form
    const handleNewPatientChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({ ...prev, [name]: value }));
    };

    // Handle input changes for editing patient form
    const handleEditPatientChange = (e) => {
        const { name, value } = e.target;
        setEditPatient((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new patient
    const addPatient = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${backendUrl}/patients`, newPatient);
            alert("Patient added successfully!");
            setNewPatient({
                name: "",
                age: "",
                phone_number: "",
                address: "",
                account_type: "",
            }); // Clear form
            fetchAllPatients(); // Refresh the list
        } catch (error) {
            console.error("Error adding patient:", error);
            alert(
                `Failed to add patient`
            );
        }
    };

    // Search for a patient by ID
    const searchPatient = async () => {
        if (!searchId) {
            alert("Please enter a patient ID to search.");
            return;
        }
        try {
            const response = await axios.get(`${backendUrl}/pateints/${searchId}`); // Note: Your backend has 'pateints'
            setFoundPatient(response.data);
        } catch (error) {
            console.error("Error searching patient:", error);
            setFoundPatient(null);
            alert(`Patient with ID ${searchId} not found.`);
        }
    };

    // Set a patient for editing
    const initiateEdit = (patient) => {
        setEditPatient({ ...patient }); // Copy patient data to edit state
    };

    // Update an existing patient
    const updatePatient = async (e) => {
        e.preventDefault();
        if (!editPatient) return;

        try {
            await axios.patch(
                `${backendUrl}/patients/${editPatient.id}`,
                editPatient
            );
            alert("Patient updated successfully!");
            setEditPatient(null); // Clear edit form
            fetchAllPatients(); // Refresh the list
        } catch (error) {
            console.error("Error updating patient:", error);
            alert(
                `Failed to update patient`
            );
        }
    };

    // Delete a patient
    const deletePatient = async (id) => {
        if (
            window.confirm(`Are you sure you want to delete patient with ID: ${id}?`)
        ) {
            try {
                await axios.delete(`${backendUrl}/patients/${id}`);
                alert("Patient deleted successfully!");
                fetchAllPatients(); // Refresh the list
                setFoundPatient(null); // Clear search result if deleted
            } catch (error) {
                console.error("Error deleting patient:", error);
                alert(
                    `Failed to delete patient`
                );
            }
        }
    };

    return (
        <>
            <div className="bg-cyan-600/60  w-3xl p-5 m-5 ml-auto mr-auto rounded-md items-center grid grid-rows-2  ">
                <h2 className="ml-auto mr-auto items-center font-bold text-black text-2xl">Patient Management</h2>
                <p className="text-black-800 p-2">
                    Here you can add new patients, search for existing ones, update their
                    details, or delete them.
                </p>


                {/* Search Patient */}
                <div >
                    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-purple-800 mb-6">Search Patient by ID</h3>
                        <input
                            type="number"
                            placeholder="Patient ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                                hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                transition-all duration-200"
                        />
                        <button onClick={searchPatient} className="w-full p-4 bg-purple-600 text-white font-medium rounded-xl 
                  hover:bg-purple-700 active:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  transition-all duration-200 shadow-md hover:shadow-lg">
                            Search
                        </button>
                    </div>

                    {/* Add New Patient */}
                    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-purple-800 mb-6">Add New Patient</h3>
                        <form onSubmit={addPatient} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newPatient.name}
                                    onChange={handleNewPatientChange}
                                    required
                                    className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                                hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                transition-all duration-200"
                                />
                            </div>
                            <div className="col-span-1">
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={newPatient.age}
                                    onChange={handleNewPatientChange}
                                    required
                                    className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                />
                            </div>
                            <div className="col-span-1">
                                <input
                                    type="number"
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    value={newPatient.phone_number}
                                    onChange={handleNewPatientChange}
                                    required
                                    className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={newPatient.address}
                                    onChange={handleNewPatientChange}
                                    required
                                    className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                />
                            </div>
                            <div className="col-span-1">
                                <input
                                    type="text"
                                    name="account_type"
                                    placeholder="Account Type"
                                    value={newPatient.account_type}
                                    onChange={handleNewPatientChange}
                                    required
                                    className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                />
                            </div>
                            <div className="col-span-1">
                                <button type="submit" className="w-full p-4 bg-purple-600 text-white font-medium rounded-xl 
                  hover:bg-purple-700 active:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  transition-all duration-200 shadow-md hover:shadow-lg">
                                    Add Patient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                    <div>
                        {foundPatient && (
                            <div style={styles.searchResult}>
                                <h4>Patient Found:</h4>
                                <p>
                                    <strong>ID:</strong> {foundPatient.id}
                                </p>
                                <p>
                                    <strong>Name:</strong> {foundPatient.name}
                                </p>
                                <p>
                                    <strong>Age:</strong> {foundPatient.age}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {foundPatient.phone_number}
                                </p>
                                <p>
                                    <strong>Address:</strong> {foundPatient.address}
                                </p>
                                <p>
                                    <strong>Account Type:</strong> {foundPatient.account_type}
                                </p>
                                <button
                                    onClick={() => initiateEdit(foundPatient)}
                                    className=" border mt-2 text-purple-600 hover:border-purple-900 hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded-lg p-3 ml-2 w-xs"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deletePatient(foundPatient.id)}
                                    className=" border mt-2 text-purple-600 hover:border-purple-900 hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded-lg p-3 ml-2 w-xs"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Edit Patient Form */}
                        {editPatient && (
                            <div style={styles.section}>
                                <h3>Edit Patient (ID: {editPatient.id})</h3>
                                <form onSubmit={updatePatient} style={styles.form}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={editPatient.name}
                                        onChange={handleEditPatientChange}
                                        required
                                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Age"
                                        value={editPatient.age}
                                        onChange={handleEditPatientChange}
                                        required
                                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                    />
                                    <input
                                        type="number"
                                        name="phone_number"
                                        placeholder="Phone Number"
                                        value={editPatient.phone_number}
                                        onChange={handleEditPatientChange}
                                        required
                                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={editPatient.address}
                                        onChange={handleEditPatientChange}
                                        required
                                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                    />
                                    <input
                                        type="text"
                                        name="account_type"
                                        placeholder="Account Type"
                                        value={editPatient.account_type}
                                        onChange={handleEditPatientChange}
                                        required
                                        className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white text-purple-700 
                  hover:border-purple-300 hover:bg-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  transition-all duration-200"
                                    />
                                    <button type="submit" style={styles.button}>
                                        Update Patient
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditPatient(null)}
                                        className=" border mt-2 text-purple-600 hover:border-purple-900 hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded-lg p-3 ml-2 w-xs"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* All Patients List */}
                    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-2xl shadow-lg">
                            <h3>All Patients</h3>
                            {patients.length > 0 ? (
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>ID</th>
                                            <th style={styles.th}>Name</th>
                                            <th style={styles.th}>Age</th>
                                            <th style={styles.th}>Phone Number</th>
                                            <th style={styles.th}>Address</th>
                                            <th style={styles.th}>Account Type</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((patient) => (
                                            <tr key={patient.id}>
                                                <td style={styles.td}>{patient.id}</td>
                                                <td style={styles.td}>{patient.name}</td>
                                                <td style={styles.td}>{patient.age}</td>
                                                <td style={styles.td}>{patient.phone_number}</td>
                                                <td style={styles.td}>{patient.address}</td>
                                                <td style={styles.td}>{patient.account_type}</td>
                                                <td style={styles.td}>
                                                    <button
                                                        onClick={() => initiateEdit(patient)}
                                                        style={styles.editButton}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deletePatient(patient.id)}
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
                                <p>No patients found.</p>
                            )}
                        </div>
                    </div>
                </div>
        </>
    )
}


