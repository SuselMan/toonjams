import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook which scroll page to top after navigation to another react-router link
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}