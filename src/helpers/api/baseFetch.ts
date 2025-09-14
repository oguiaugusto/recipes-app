/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';

async function baseFetch<T>(key: string, url: string, defaultReturn: T) {
  try {
    const res = await axios.get(url);
    const data = (res.data as unknown as any)[key] as T | null;

    if (!data) {
      throw new Error();
    }

    return data;
  } catch (_) {
    return defaultReturn;
  }
}

export { baseFetch };
