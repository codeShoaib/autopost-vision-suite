
import React from 'react';
import { Navigate } from 'react-router-dom';

// For now, we'll redirect the index page to the dashboard
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
