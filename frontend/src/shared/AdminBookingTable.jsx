import React from "react";
import AdminBookingRow from "./AdminBookingRow";

const AdminBookingTable = ({ bookings }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Tour Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Guests
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Booking Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Tour Date
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <AdminBookingRow key={booking._id} booking={booking} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingTable;
