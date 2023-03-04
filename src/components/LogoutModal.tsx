import React from "react";
import { useAuth } from "../hooks/useAuth";

type Props = {
  close: () => void;
};

function LogoutModal({ close }: Props) {
  const handleCloseModal = (e: any) => {
    e.stopPropagation();
    close();
  };
  const { logout } = useAuth();
  return (
    <>
      <div className="fixed inset-0 z-20 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50">
        <div
          className="fixed inset-0 h-screen w-screen"
          onClick={handleCloseModal}
        ></div>
        <div className="relative z-30 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white text-center w-4/5 max-w-[400px] mx-auto">
          <div className="p-4">
            <h6 className="font-semibold text-xl tracking-tight">
              Confirm Logout
            </h6>
          </div>
          <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50 p-4 rounded-none rounded-b-lg">
            <p className="mb-4 text-sm">Are you sure you want to log out?</p>
            <div className="flex gap-4">
              <button
                onClick={logout}
                className="flex-1 font-bold py-2 rounded-md text-xs border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                Yes, logout
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 text-gray-800 dark:text-gray-100 font-bold py-2 rounded-md text-xs border-2 border-gray-400 dark:border-gray-800 bg-gray-400 dark:bg-gray-800 hover:border-gray-500 dark:hover:border-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogoutModal;
