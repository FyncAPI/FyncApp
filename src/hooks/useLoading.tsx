import React, { useEffect } from "react";

export const useLoading = () => {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
};
