import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const { logout } = useAuth();
  return (
    <div className="container mx-auto">
      <div className="pl-8 pt-8">
        <div>you are logged in!</div>
        <button
          className="font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
