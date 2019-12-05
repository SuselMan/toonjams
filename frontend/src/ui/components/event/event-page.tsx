import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Event } from './event';

export const EventPage = () => {
  const { id } = useParams();

  /**
   * TODO: Fetch event data by using custom fetch hook
   */

  return (
    <>
      <h1>Event page</h1>
      <Event />
    </>
  );
}