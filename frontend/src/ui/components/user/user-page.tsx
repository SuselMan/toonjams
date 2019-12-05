import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const UserPage = () => {
  const { id } = useParams();

  /**
   * TODO: Fetch user data by using custom fetch hook
   */

  return (
    <>
      <h1>UserPage and user data here</h1>
    </>
  );
}