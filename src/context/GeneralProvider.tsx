import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { GeneralContext } from './GeneralContext';
import { Loader } from '../components/Loader';

const GeneralProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {};

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
