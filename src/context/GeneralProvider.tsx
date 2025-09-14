import { PropsWithChildren, useState } from 'react';

import { GeneralContext } from './GeneralContext';
import { Loader } from '../components/Loader';
import { saveUser } from '../helpers/localStorage';

const GeneralProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (name: string) => {
    saveUser({ name });
  };

  const value = {
    setLoading,
    handleLogin,
  };

  if (loading) {
    return <Loader />;
  }

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};

export { GeneralProvider };
