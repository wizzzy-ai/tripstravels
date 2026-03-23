import React from "react";
import AdminTourRow from "./AdminTourRow";

const AdminTourTable = ({ tours }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Tour Title
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Featured
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Group Size
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Reviews
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tours.map((tour) => (
            <AdminTourRow key={tour._id} tour={tour} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTourTable;
