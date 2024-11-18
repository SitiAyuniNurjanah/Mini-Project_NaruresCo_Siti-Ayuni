import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import supabase from "../../services/supabaseClient";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
    
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
    
      if (session) {
        setIsAuthenticated(true);
    
        const { data: user, userError } = await supabase
          .from("users")
          .select("role")
          .eq("guid", session.user.id)
          .single();
    
        if (userError) {
          console.error("Error fetching user data:", userError.message);
          setUserRole(null);
        } else {
          setUserRole(user.role);
        }
      } else {
        setIsAuthenticated(false);
      }
    
      setLoading(false);
    };
    

    checkSession();

    // Subscribe ke perubahan status autentikasi
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
        <span>Loading...</span>
      </div>
    );
  }

  if (
    !isAuthenticated ||
    (allowedRoles.length > 0 && !allowedRoles.includes(userRole))
  ) {
    return <Navigate to={`/login?redirect=${window.location.pathname}`} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
