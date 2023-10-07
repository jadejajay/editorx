import type { DateTimeFormatOptions } from 'intl';
import { useEffect, useState } from 'react';
// Custom hook to calculate and format time difference
function useFormattedTimeDifference(targetTime: number) {
  const [formattedTimeDifference, setFormattedTimeDifference] = useState('');

  useEffect(() => {
    const calculateFormattedTimeDifference = () => {
      const currentTime = Date.now();
      const timeDifferenceMs = currentTime - targetTime;

      const seconds = Math.floor(timeDifferenceMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        setFormattedTimeDifference('now');
      } else if (minutes < 60) {
        setFormattedTimeDifference(`${minutes}m`);
      } else if (hours < 24) {
        setFormattedTimeDifference(`${hours}h`);
      } else if (days < 31) {
        setFormattedTimeDifference(`${days}d`);
      } else {
        // Format the date as 'day month year'
        const options: DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        const formattedDate = new Date(targetTime).toLocaleDateString(
          'en-US',
          options
        );
        setFormattedTimeDifference(formattedDate);
      }
    };

    const intervalId = setInterval(calculateFormattedTimeDifference, 1000);

    calculateFormattedTimeDifference(); // Calculate initially

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return formattedTimeDifference;
}

export default useFormattedTimeDifference;
