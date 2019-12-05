import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Media } from './media';

export const MediaPage = () => {
  const { id } = useParams();

  /**
   * TODO: Fetch media data by using custom fetch hook
   */

  return (
    <>
      <h1>Media page</h1>
      <Media />
    </>
  );
}