import { useRouter } from 'next/router';
import { useMemo } from 'react';

/**
 * This function Extract Search Params from URL
 * e.g. www.zintlr/id?=someId
 */
function useQuery() {
  const { query } = useRouter();
  return useMemo(() => query, [query]);
}

export default useQuery;
