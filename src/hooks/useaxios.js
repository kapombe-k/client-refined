import { useMemo } from 'react';
import axios from '../api-calls/axios';

export const useAxios = () => {
  return useMemo(() => axios, []);
};
