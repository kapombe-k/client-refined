import PatientComponent from "./routes/patients";
import VisitsComponent from "./routes/visits";
import AppointmentComponent from "./routes/appointment";
import DoctorComponent from "./routes/doctors";

function App() {

  return (
    <>
      <PatientComponent />
      <DoctorComponent />
      <VisitsComponent />
      <AppointmentComponent />
    </>
  );
}

export default App;
