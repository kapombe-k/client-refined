import NavBar from "@/components/navbar";
import { NavLink } from "react-router";

export default function Page() {
    return (
        <>
            <NavBar />

            <div className="fixed inset-0 flex items-center justify-center p-4 bg-[url('https://media.istockphoto.com/id/1165997279/vector/hospital-blurred-background-medical-backdrop-with-molecules-blur-interior-inside-building.jpg?s=612x612&w=0&k=20&c=MB1COYmM2P9hBpjLRSMrXlLMP-2dnEQCWp6_l9xbO1k=')] bg-cover bg-center opacity-90">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-cyan-700 bg-opacity-90 rounded-xl shadow-xl">

                    <div className="w-full h-[400px] rounded-xl p-5 relative overflow-hidden font-sans shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600"><h3 className="text-2xl font-bold text-white drop-shadow-md">Patients</h3><NavLink to='/patients'><button className="absolute bottom-5 left-5 px-5 py-2 bg-white/20 text-white border border-white rounded-full font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:text-indigo-500 hover:scale-105">View actions</button></NavLink></div>

                    <div className="w-full h-[400px] rounded-xl p-5 relative overflow-hidden font-sans shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600"><h3 className="text-2xl font-bold text-white drop-shadow-md">Visits</h3><NavLink to='/visits'><button className="absolute bottom-5 left-5 px-5 py-2 bg-white/20 text-white border border-white rounded-full font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:text-indigo-500 hover:scale-105">View actions</button></NavLink></div>

                    <div className="w-full h-[400px] rounded-xl p-5 relative overflow-hidden font-sans shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600"><h3 className="text-2xl font-bold text-white drop-shadow-md">Appointments</h3>
                        <NavLink to='/appointments'><button className="absolute bottom-5 left-5 px-5 py-2 bg-white/20 text-white border border-white rounded-full font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:text-pink-500 hover:scale-105">View actions</button></NavLink></div>

                    <div className="w-full h-[400px] rounded-xl p-5 relative overflow-hidden font-sans shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600">
                        <h3 className="text-2xl font-bold text-white drop-shadow-md">Doctors</h3>
                        <NavLink to='/doctors'><button className="absolute bottom-5 left-5 px-5 py-2 bg-white/20 text-white border border-white rounded-full font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:text-emerald-500 hover:scale-105">View actions</button></NavLink></div>

                </div>
            </div>
        </>
    )
}





