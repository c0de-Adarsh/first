"use client";

import { ShoppingCart, Store, Calendar, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Modules() {
  const router = useRouter();

  
    const { isAuthenticated, loading } = useSelector((state) => state.user);
  
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]);
  const modules = [
    {
      title: "Grocery",
      icon: Store,
      color: "bg-emerald-500",
      href: "/dashboard/grocery"
    },
    {
      title: "Online Shopping",
      icon: ShoppingCart,
      color: "bg-blue-500",
      href: "/dashboard/shopping"
    },
    {
      title: "CMP Rides Booking",
      icon: Calendar,
      color: "bg-purple-500",
      href: "/dashboard/booking"
    },
    {
      title: "Food Delivery",
      icon: UtensilsCrossed,
      color: "bg-red-500",
      href: "/dashboard/food"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Select a Module</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              onClick={() => router.push(module.href)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`${module.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                <module.icon className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
              <p className="text-gray-600">Access your {module.title.toLowerCase()} dashboard</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}