import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <button
        onClick={() => navigate("/projects")}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        View Projects
      </button>

      <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
