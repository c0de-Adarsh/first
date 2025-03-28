"use client";

import { useEffect, useState } from "react";
import { Menu, X, Users, Truck, BarChart3, Clock, Bell, User, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { clearMessages, logoutSuccess } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";


export default function Dashboard({ moduleName = "TruckType" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [truckName, setTruckName] = useState("");
    const [image, setImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();  
    const dispatch = useDispatch()
    const { isAuthenticated, loading } = useSelector((state) => state.user);
      
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/"); 
      }
    }, [isAuthenticated, router]);

    const handleLogout = () => {
        dispatch(logoutSuccess());
        setTimeout(() => {
            dispatch(clearMessages());
            toast.success('sign out successfuly!')
            router.replace("/"); 
        }, 2000); 
    };

    const handleNavigation = (path) => {
        router.push(path);
        setIsMenuOpen(false);
    };

    const handleAddTruck = () => {
        // Handle form submission
        console.log("Adding truck:", { truckName, image });
    };

    const menuItems = [
        { label: "Dashboard", path: "/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
        { label: "User Management", path: "/user-management", icon: <Users className="w-5 h-5" /> },
        { label: "Transporter", path: "/dashboard/transporter", icon: <Truck className="w-5 h-5" /> },
        { label: "Truck Type", path: "/dashboard/trucktype", icon: <Truck className="w-5 h-5" /> },
        { label: "Load Type", path: "/load-type", icon: <Truck className="w-5 h-5" /> },
        { label: "Unit", path: "/unit", icon: <Truck className="w-5 h-5" /> },
        { label: "Service Fee", path: "/service-fee", icon: <BarChart3 className="w-5 h-5" /> },
        { label: "Sub Admin", path: "/sub-admin", icon: <User className="w-5 h-5" /> },
        { label: "Activity Report", path: "/activity-report", icon: <BarChart3 className="w-5 h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <aside className={`${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 bg-white shadow-xl`}>
                <div className="p-4 border-b border-gray-200">
                    <div className="h-12 flex items-center justify-center">
                        <img src="/images/ds.png" alt="" className="h-full" />
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                pathname === item.path
                                    ? "bg-blue-600 text-white font-medium" 
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >
                            {item.icon}
                            <span className="ml-3 font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <div className="md:ml-64 min-h-screen flex flex-col">
                <header className="bg-white shadow-md sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 rounded-lg md:hidden hover:bg-gray-100"
                                >
                                    {isMenuOpen ? (
                                        <X className="w-6 h-6 text-gray-700" />
                                    ) : (
                                        <Menu className="w-6 h-6 text-gray-700" />
                                    )}
                                </button>
                                <h1 className="text-2xl font-bold text-gray-900">{moduleName} Dashboard</h1>
                                <div className="flex items-center gap-3 md:hidden">
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <Bell className="w-6 h-6 text-gray-700" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <User className="w-6 h-6 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                               
                                <button 
                                    onClick={handleLogout} 
                                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-md"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">15</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Users className="w-7 h-7 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Transporter</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">13</h3>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <Truck className="w-7 h-7 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Transactions ETB</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">927,579</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <BarChart3 className="w-7 h-7 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Commission ETB</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">1,825</h3>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <Clock className="w-7 h-7 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div> */}



                {/* form section */}


                <div className="p-6 flex-grow">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl text-gray-900 font-bold">Add Truck Type</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search Truck"
                                    className="pl-10 text-gray-900 pr-4 py-2 w-[300px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>
                        
                        <div className="max-w-2xl mx-auto">
                            <div className="mb-8 flex justify-center">
                                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {image ? (
                                        <img 
                                            src={URL.createObjectURL(image)} 
                                            alt="Truck preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Truck className="w-16 h-16 text-gray-400" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Truck Name
                                    </label>
                                    <input
                                        type="text"
                                        value={truckName}
                                        onChange={(e) => setTruckName(e.target.value)}
                                        placeholder="Name of the Truck"
                                        className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Image
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            <div className="flex text-sm text-gray-600">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={(e) => setImage(e.target.files[0])}
                                                        accept="image/*"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddTruck}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Add Now
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTruckName("");
                                            setImage(null);
                                        }}
                                        className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
               
            </div>
        </div>
    );
}