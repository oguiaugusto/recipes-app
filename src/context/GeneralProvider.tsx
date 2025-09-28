import { PropsWithChildren, useState } from 'react';
import { GeneralContext } from './GeneralContext';
import { Loader } from '../components/Loader';
import { getFromStorage, saveToStorage } from '../helpers/localStorage';

const GeneralProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (name: string) => {
    saveToStorage('user', { name });

    const favoriteRecipes = getFromStorage('favoriteRecipes');
    const doneRecipes = getFromStorage('doneRecipes');

    if (!favoriteRecipes) {
      saveToStorage('favoriteRecipes', []);
    }
    if (!doneRecipes) {
      saveToStorage('doneRecipes', []);
    }
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
