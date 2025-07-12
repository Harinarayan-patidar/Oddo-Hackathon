import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profileImage from "../../../../assets/profileImage.jpg"; // ✅ correct image import
import image1  from "../../../../assets/images1.jpg"; // Example image for items
import image2 from "../../../../assets/images.jpg"; // Example image for items

const user = {
  name: "Harinarayan Patidar",
  email: "hari@example.com",
  location: "Bhopal",
  profileImage: profileImage, // ✅ used here
  points: 120,
  uploadedItems: [
    { id: 1, title: "Denim Jacket", image: image1, status: "Available" },
    { id: 2, title: "Kurta", image: image2, status: "Swapped" },
  ],
  ongoingSwaps: [
    { id: 101, itemTitle: "Cotton T-shirt", otherUser: "Patel Ji", status: "Requested" },
  ],
  completedSwaps: [
    { id: 201, itemTitle: "Blue Hoodie", otherUser: "Kavendra", date: "2025-07-10" },
  ],
};

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-lime-50 py-8 px-4 md:px-12">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <div className="flex items-center gap-4">
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-green-700">{user.name}</h2>
            <p className="text-sm text-gray-700">{user.email}</p>
            <p className="text-sm text-gray-600">📍 {user.location || "Not set"}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-lg font-semibold text-green-600">
            🌱 Points: <span className="font-bold">{user.points}</span>
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-start mb-8">
        <Link
          to="/add-item"
          className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition"
        >
          ➕ Add New Item
        </Link>
        <Link
          to="/browse"
          className="bg-white border border-green-600 text-green-700 px-5 py-2 rounded-full shadow hover:bg-green-100 transition"
        >
          🔍 Browse All Items
        </Link>
      </div>

      {/* Uploaded Items */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-green-800 mb-3">🧺 Your Uploaded Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.uploadedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover object-center rounded-md mb-3"
              />
              <h4 className="font-semibold text-green-700">{item.title}</h4>
              <p className="text-sm text-gray-500">Status: {item.status}</p>
              <div className="mt-2 flex gap-3">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ongoing Swaps */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-green-800 mb-2">🔄 Ongoing Swaps</h3>
        {user.ongoingSwaps.length === 0 ? (
          <p className="text-gray-600 italic">No active swaps yet.</p>
        ) : (
          <ul className="space-y-2">
            {user.ongoingSwaps.map((swap) => (
              <motion.li
                key={swap.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-3 rounded-xl shadow"
              >
                <strong>{swap.itemTitle}</strong> with{" "}
                <span className="text-green-700">{swap.otherUser}</span> —{" "}
                <em>{swap.status}</em>
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      {/* Completed Swaps */}
      <section>
        <h3 className="text-2xl font-semibold text-green-800 mb-2">✅ Completed Swaps</h3>
        {user.completedSwaps.length === 0 ? (
          <p className="text-gray-600 italic">No swaps completed yet.</p>
        ) : (
          <ul className="space-y-2">
            {user.completedSwaps.map((swap) => (
              <motion.li
                key={swap.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-3 rounded-xl shadow"
              >
                <strong>{swap.itemTitle}</strong> swapped with{" "}
                <span className="text-green-700">{swap.otherUser}</span> on{" "}
                {new Date(swap.date).toLocaleDateString()}
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
