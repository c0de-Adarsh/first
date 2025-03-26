"use client";

import { useEffect, useState } from "react";
import { Menu, X, Users, Truck, BarChart3, Clock, Bell, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { clearMessages, logoutSuccess } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";

export default function Dashboard({ moduleName = "Dashboard" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    // Navigation handler
    const handleNavigation = (path) => {
        router.push(path);
        setIsMenuOpen(false);
    };

    const menuItems = [
        { 
            label: "Dashboard", 
            path: "/dashboard", 
            icon: <BarChart3 className="w-5 h-5" /> 
        },
        { 
            label: "User Management", 
            path: "/user-management", 
            icon: <Users className="w-5 h-5" /> 
        },
        { 
            label: "Transporter", 
            path: "/dashboard/transporter", 
            icon: <Truck className="w-5 h-5" /> 
        },
        { 
            label: "Truck Type", 
            path: "/truck-type", 
            icon: <Truck className="w-5 h-5" /> 
        },
        { 
            label: "Load Type", 
            path: "/load-type", 
            icon: <Truck className="w-5 h-5" /> 
        },
        { 
            label: "Unit", 
            path: "/unit", 
            icon: <Truck className="w-5 h-5" /> 
        },
        { 
            label: "Service Fee", 
            path: "/service-fee", 
            icon: <BarChart3 className="w-5 h-5" /> 
        },
        { 
            label: "Sub Admin", 
            path: "/sub-admin", 
            icon: <User className="w-5 h-5" /> 
        },
        { 
            label: "Activity Report", 
            path: "/activity-report", 
            icon: <BarChart3 className="w-5 h-5" /> 
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay for mobile menu */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 bg-white shadow-lg`}
            >
                <div className="p-4 border-b">
                    <div className="h-12 flex items-center justify-center">
                        <img src="/images/ds.png" alt="" />
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                index === 0 
                                    ? "bg-blue-500 text-white" 
                                    : "text-gray-900 hover:bg-gray-100"
                            }`}
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 rounded-lg md:hidden hover:bg-gray-100"
                                >
                                    {isMenuOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </button>
                                <h1 className="text-2xl font-bold">{moduleName} Dashboard</h1>
                                <div className="flex items-center gap-3 md:hidden">
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <Bell className="w-6 h-6" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <User className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                    <input
                                        type="date"
                                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="From"
                                    />
                                    <input
                                        type="date"
                                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="To"
                                    />
                                    <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                                        Apply
                                    </button>
                                </div>
                                <div className="hidden md:flex items-center gap-3">
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <Bell className="w-6 h-6" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <User className="w-6 h-6" />
                                    </button>
                                </div>
                                <button 
                                    onClick={handleLogout} 
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Users</p>
                                <h3 className="text-2xl font-bold">15</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Transporter</p>
                                <h3 className="text-2xl font-bold">13</h3>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <Truck className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Transactions ETB</p>
                                <h3 className="text-2xl font-bold">927,579</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <BarChart3 className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Commission ETB</p>
                                <h3 className="text-2xl font-bold">1,825</h3>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <Clock className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="p-4 flex-grow">
                    <div className="p-6 bg-white rounded-lg shadow-md h-full">
                        <h3 className="mb-4 text-lg font-semibold">Total Users</h3>
                        <div className="h-[calc(100%-2rem)] min-h-[300px] bg-gray-50 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}