import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // 🔥 استنى لحد ما auth يخلص
  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <span className="text-lg">Loading...</span>
    </div>
  );
}

  // ❌ مش مسجل
  if (!user) {
    return <Navigate to="/login/en" replace />;
  }

  // ❌ مش عنده صلاحية
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/home/en" replace />;
  }

  // ✅ تمام
  return children;
};

export default ProtectedRoute;