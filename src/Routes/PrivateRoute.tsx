import React from 'react'
import { useMeQuery } from '../graphql/hooks';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data?.me) {
    return <Navigate to="/login" replace />
  }

  return children;
  
}

