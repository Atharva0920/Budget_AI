import { useEffect, useState } from "react";
import { X, Mail, User } from "lucide-react";
import axiosInstance from "../axiosInstance";

export default function ProfileModal({ isOpen, onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(false);

      axiosInstance
        .get("/api/user/me")
        .then((response) => {
          setUserInfo(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          setError(true);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
        {/* Header */}
        <div className="relative flex flex-col items-center text-center px-6 pt-8 pb-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>

          {/* Loading State */}
          {loading && (
            <p className="text-gray-600 py-8">Loading profile...</p>
          )}

          {/* Error State */}
          {error && (
            <p className="text-red-600 py-8">
              Failed to load user info. Please try again later.
            </p>
          )}

          {/* Profile Content */}
          {!loading && !error && userInfo && (
            <>
              <img
                src={
                  userInfo.profilePic ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(userInfo.username)
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md object-cover"
              />

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {userInfo.fullName || userInfo.username}
              </h2>
              <p className="text-sm text-gray-500">@{userInfo.username}</p>
            </>
          )}
        </div>

        {/* Info Section */}
        {!loading && !error && userInfo && (
          <div className="px-6 pb-6 space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center">
                <Mail size={16} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{userInfo.email}</p>
              </div>
            </div>

            {/* Username */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-gray-900">@{userInfo.username}</p>
              </div>
            </div>

            {/* Created At */}
            <div className="text-sm text-gray-500">
              Joined on{" "}
              {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
