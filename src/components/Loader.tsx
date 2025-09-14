import React from 'react';
import { TailSpin } from 'react-loading-icons';

const Loader: React.FC = () => {
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center pb-5">
      <TailSpin className="mb-5" stroke="#f8f9fa" speed={1.2} width="60px" height="60px" />
    </div>
  );
};

export { Loader };
