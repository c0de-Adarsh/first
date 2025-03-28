"use client";

import { useEffect, useState } from "react";
import { Menu, X, Users, Truck, BarChart3, Clock, Bell, User, MapPin, Stars as MarsStroke, Info, Check, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";
import { fetchAllDrivers, fetchDriverDetails, updateDriverStatus, verifyDriver } from "@/redux/driversActions";
import { clearMessages, logoutSuccess } from "@/redux/slices/userSlice";
import DriverDocumentsCarousel from "./DriverDocumentsCarousel";

export default function Transporter({ moduleName = "Transporter" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch()
    const { isAuthenticated, loading } = useSelector((state) => state.user);
    const {
        drivers,
        loading: driversLoading,
        error: driversError,
        selectedDriverDetails
    } = useSelector((state) => state.drivers);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/");
        }
        dispatch(fetchAllDrivers());
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (driversError) {
            toast.error(driversError);
        }
    }, [driversError]);

    const handleLogout = () => {
        dispatch(logoutSuccess());
        setTimeout(() => {
            dispatch(clearMessages());
            toast.success('Sign out successfully!')
            router.replace("/");
        }, 2000);
    };

    const handleDriverVerification = (driverId, location) => {
        // Check if location is valid before attempting to open maps
        if (location && location !== 'N/A') {
            const [latitude, longitude] = location.split(',').map(coord => coord.trim());
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            window.open(googleMapsUrl, '_blank');
        } else {
            toast.error("Location information is not available");
        }
    };



    const openDriverModal = (driver) => {
        dispatch(fetchDriverDetails(driver.id || driver._id));

        setSelectedDriver({
            ...driver,
            totalRides: 80,
            totalEarnings: 150
        });
        setIsDriverModalOpen(true);
    };

    const handleVerifyDriver = () => {
        if (selectedDriver) {
            dispatch(updateDriverStatus(selectedDriver.id || selectedDriver._id, 'verify'))
                .then(() => {
                    setIsDriverModalOpen(false);
                })
                .catch((error) => {
                    console.error('Verification failed', error);
                });
        }
    };


    const handleSuspendDriver = () => {
        if (selectedDriver) {
            dispatch(updateDriverStatus(selectedDriver.id || selectedDriver._id, 'suspend'))
                .then(() => {
                    setIsDriverModalOpen(false);
                })
                .catch((error) => {
                    console.error('Suspension failed', error);
                });
        }
    };
    const handleNavigation = (path) => {
        router.push(path);
        setIsMenuOpen(false);
    };

    // const handleSuspendDriver = () => {
    //     toast.warning('Driver suspended');
    //     setIsDriverModalOpen(false);
    // };




    const renderDriverModalButtons = () => {
        const status = selectedDriverDetails?.status || 'PENDING';

        if (status === 'PENDING') {
            return (
                <div className="flex space-x-4 pt-4">
                    <button
                        onClick={handleVerifyDriver}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                    >
                        <Check className="w-5 h-5 mr-2" />
                        Verify Driver
                    </button>
                    <button
                        onClick={handleSuspendDriver}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                    >
                        <XCircle className="w-5 h-5 mr-2" />
                        Suspend Driver
                    </button>
                </div>
            );
        } else if (status === 'VERIFIED') {
            return (
                <div className="flex space-x-4 pt-4">
                    {/* <button
                        onClick={handleSuspendDriver}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                    >
                        <XCircle className="w-5 h-5 mr-2" />
                        Suspend Driver
                    </button> */}
                </div>
            );
        } else if (status === 'SUSPENDED') {
            return (
                <div className="pt-4 text-center">
                    <p className="text-red-600 font-medium">Driver is Suspended</p>
                </div>
            );
        }

        return null;
    };




    const menuItems = [
        { label: "Dashboard", path: "/dashboard/food", icon: <BarChart3 className="w-5 h-5" /> },
        { label: "User Management", path: "/dashboard/user-management", icon: <Users className="w-5 h-5" /> },
        { label: "Transporter", path: "/dashboard/transporter", icon: <Truck className="w-5 h-5" /> },
        { label: "Truck Type", path: "/truck-type", icon: <Truck className="w-5 h-5" /> },
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

            <aside className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 bg-white shadow-xl`}>
                <div className="p-4 border-b border-gray-200">
                    <div className="h-12 flex items-center justify-center">
                        <img src="/images/ds.png" alt="" className="h-full" />
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${item.label === "Transporter"
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
                                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                    <input
                                        type="date"
                                        className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                        placeholder="From"
                                    />
                                    <input
                                        type="date"
                                        className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                        placeholder="To"
                                    />
                                    <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md">
                                        Apply
                                    </button>
                                </div>
                                {/* <div className="hidden md:flex items-center gap-3">
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <Bell className="w-6 h-6 text-gray-700" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <User className="w-6 h-6 text-gray-700" />
                                    </button>
                                </div> */}
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

                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Transporter</h2>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-700">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18M6 12h12M9 18h6" />
                                    </svg>
                                </button>
                                <span className="font-medium text-gray-700">Filter By</span>
                            </div>
                            <input
                                type="date"
                                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                        </div>

                        {isDriverModalOpen && selectedDriver && (
                            <div
                                className="fixed inset-0 bg-opacity-20  z-50 flex items-center justify-center"
                                onClick={() => setIsDriverModalOpen(false)}
                            >
                                <div
                                    className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Driver Details</h2>
                                        <button
                                            onClick={() => setIsDriverModalOpen(false)}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div> */}

                                    {isDriverModalOpen && selectedDriver && (
                                        <div
                                            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center"
                                            onClick={() => setIsDriverModalOpen(false)}
                                        >
                                               <div 
      className="bg-white h-auto rounded-lg shadow-xl p-2 w-[800px] max-w-xl mx-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-900">Driver Details</h2>
        <button
          onClick={() => setIsDriverModalOpen(false)}
          className="text-gray-600 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {selectedDriverDetails ? (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <div>
              <p className="text-[10px] text-gray-900">Name</p>
              <p className="text-xs text-gray-700">
                {selectedDriverDetails.name || selectedDriverDetails.username || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-gray-900">Mobile</p>
              <p className="text-xs text-gray-700">
                {selectedDriverDetails.phone || selectedDriverDetails.mobile || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-900">DL Number</p>
              <p className="text-xs text-gray-700">
                {selectedDriverDetails.dl_number || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-900">Truck Type</p>
              <p className="text-xs text-gray-700">
                {selectedDriverDetails.vehicle_type || 'N/A'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4  bg-gray-50  rounded-lg">
            <div>
              <p className="text-[10px] text-gray-900">Total Rides</p>
              <p className="text-sm text-gray-700">
                {selectedDriverDetails.totalRides || 0}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-900">Total Earning</p>
              <p className="text-sm text-gray-700">
                ETB {selectedDriverDetails.totalEarnings || 0}
              </p>
            </div>


            <div>
              <p className="text-[10px] text-gray-900">Addres letter</p>
              <p className="text-sm text-gray-700">
                ETB {selectedDriverDetails.
address_support_letter || 0}
              </p>
            </div>



            <div>
              <p className="text-[10px] text-gray-900">Sin_Number</p>
              <p className="text-sm text-gray-700">
                ETB {selectedDriverDetails.
sin_number || 0}
              </p>
            </div>
          </div>

          {/* Assuming DriverDocumentsCarousel is a separate component */}
          <DriverDocumentsCarousel selectedDriverDetails={selectedDriverDetails} />

          <div className="flex p-4 space-x-4">
                                                            {(selectedDriverDetails?.status === 'pending') && (
                                                                <>
                                                                    <button
                                                                        onClick={handleVerifyDriver}
                                                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                                                                    >
                                                                        <Check className="w-5 h-5 mr-2" />
                                                                        Verify Driver
                                                                    </button>
                                                                    <button
                                                                        onClick={handleSuspendDriver}
                                                                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                                                                    >
                                                                        <XCircle className="w-5 h-5 mr-2" />
                                                                        Suspend Driver
                                                                    </button>
                                                                </>
                                                            )}
                                                            {(selectedDriverDetails?.status === 'SUSPENDED') && (
                                                                <button
                                                                    onClick={handleVerifyDriver}
                                                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                                                                >
                                                                    <Check className="w-5 h-5 mr-2" />
                                                                    Verify Driver
                                                                </button>
                                                            )}
                                                            {(selectedDriverDetails?.status === 'VERIFIED') && (
                                                                <button
                                                                    onClick={handleSuspendDriver}
                                                                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                                                                >
                                                                    <XCircle className="w-5 h-5 mr-2" />
                                                                    Suspend Driver
                                                                </button>
                                                            )}
                                                        </div>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-xs text-gray-500">Loading driver details...</p>
        </div>
      )}
    </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}





                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                      
                                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Created At</th>
                                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Mobile</th>
                                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                        {/* <th className="p-4 text-left text-sm font-semibold text-gray-900">Location</th> */}
                                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {driversLoading ? (
                                        <tr>
                                            <td colSpan="8" className="text-center p-4 text-gray-500">
                                                Loading drivers...
                                            </td>
                                        </tr>
                                    ) : Array.isArray(drivers) && drivers.length > 0 ? (
                                        drivers.map((driver, index) => {


                                            const driverId = driver.id || driver._id || (index + 1).toString();
                                            const driverName = driver.name || driver.username || 'N/A';
                                            // const driverEmail = driver.email || 'N/A';
                                            const driverCreatedAt = driver.createdAt
                                                ? new Date(driver.createdAt).toLocaleDateString()
                                                : 'N/A';
                                            const driverMobile = driver.phone || driver.mobile || 'N/A';
                                            const driverStatus = driver.status || 'PENDINGg';
                                            const driverLocation = driver.location && driver.location.coordinates
                                                ? `${driver.location.coordinates[0]}, ${driver.location.coordinates[1]}`
                                                : driver.address || 'N/A';

                                            return (
                                                <tr key={driverId} className="hover:bg-gray-50">
                                                    <td className="p-4 text-sm text-gray-900">{driverId}</td>
                                                    <td className="p-4 text-sm text-gray-900 font-medium">{driverName}</td>
                                                    {/* <td className="p-4 text-sm text-gray-600">{driverEmail}</td> */}
                                                    <td className="p-4 text-sm text-gray-600">{driverCreatedAt}</td>
                                                    <td className="p-4 text-sm text-gray-600">{driverMobile}</td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${driverStatus === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : driverStatus === 'VERIFIED'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {driverStatus}
                                                        </span>
                                                    </td>
                                                    {/* <td className="p-4 text-sm text-gray-600">{driverLocation}</td> */}
                                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleDriverVerification(driverId, driverLocation)}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="View Location"
                                                            >
                                                                <MapPin className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => openDriverModal(driver)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="View Details"
                                                            >
                                                                <Info className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center p-4 text-gray-500">
                                                No drivers found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}