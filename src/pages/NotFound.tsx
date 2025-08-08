import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-light mb-4">404</h1>
          <h2 className="text-3xl font-medium mb-6">Page Not Found</h2>
          <p className="text-xl text-arch-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a href="/" className="btn-primary">
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
