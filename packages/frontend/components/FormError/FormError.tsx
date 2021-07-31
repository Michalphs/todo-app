import React from 'react';

const FormError = ({ errorMessage }: { errorMessage: string }) => (
  <>{Boolean(errorMessage) && <div className="p-4 rounded bg-red-100 text-red-500">{errorMessage}</div>}</>
);

export default FormError;
