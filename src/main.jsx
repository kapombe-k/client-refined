import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import PatientComponent from "./routes/patients";
import DoctorComponent from './routes/doctors';
import AppointmentComponent from './routes/appointment';
import VisitsComponent from './routes/visits';
import Page from './routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page/>,
  },
  {
    path: "/patients",
    element: <PatientComponent />,
  },
  {
    path: "/doctors",
    element: <DoctorComponent />
  },
  {
    path: "/appointments",
    element: <AppointmentComponent />
  },
  {
    path: "/visits",
    element: <VisitsComponent />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
