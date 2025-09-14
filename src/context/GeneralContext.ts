import { createContext } from 'react';

import { useSafeContext } from '../hooks/useSafeContext';

interface IGeneralContext {
  setLoading: (x: boolean) => void;
  handleLogin: VoidFunction;
}

const GeneralContext = createContext<IGeneralContext | null>(null);
const useGeneralContext = () => useSafeContext(GeneralContext);

export { GeneralContext, useGeneralContext };
