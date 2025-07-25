import * as React from "react";
import { useLocation } from "react-router-dom";


const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.warn(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const pageText = `404 Page not found. Oops! The page you are looking for could not be found. Return to Home.`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
