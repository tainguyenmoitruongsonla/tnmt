import { createContext, useContext, useState } from 'react';
import Loading from 'src/@core/components/loading';

interface LoadingContextProps {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const loadingContextValue: LoadingContextProps = {
    isLoading,
    showLoading,
    hideLoading
  };

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      {children}
      {isLoading && (<Loading isLoading={isLoading} />)}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  }

  return loadingContext;
};
