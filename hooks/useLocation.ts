import { useEffect, useState } from 'react';

interface ILocationCoords {
  latitude: number;
  longitude: number;
}

interface ILocationError {
  code: number;
  message: string;
}
interface IGeolocation {
  onLoad: boolean;
  coords?: ILocationCoords;
  error?: ILocationError;
}

export default function useLocation() {
  const [location, setLocation] = useState<IGeolocation>({
    onLoad: false,
  });

  const onSuccess = ({ coords }: { coords: ILocationCoords }) => {
    setLocation({
      onLoad: true,
      coords,
    });
  };

  const onError = (error: ILocationError) => {
    setLocation({
      onLoad: false,
      error,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 400,
        message: 'WEB Geolocation API를 사용할 수 없습니다.',
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return { location, getLocation };
}
