import { useEffect } from 'react';

import { StorageHelper } from '~/app/backend/storage';

const debugStorage = async () => {
  const userData = await StorageHelper.getUserData();
  console.log('Current storage data:', userData);
};

const useDebugStorage = () => {
  useEffect(() => {
    debugStorage();
  }, []);
};

export default useDebugStorage;
