import ErrorPage from "../Pages/ErrorPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  condition: boolean;
}
const ProtectedRoute = ({ children, condition }: ProtectedRouteProps) => {
  return condition ? <>{children}</> : <ErrorPage />;
};

export default ProtectedRoute;
