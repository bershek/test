import { useState, useEffect } from 'react';

export interface ListOption {
  text: string;
  icon: string;
}

export const useListOption = () => {
  const [options, setOptions] = useState<ListOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/bershek/fakeApi/options');
        const jsonData = await response.json();
        setOptions(jsonData);
      } catch (error) {
        console.log('useListOption', error);
      }
    };

    fetchData();
  }, []);

  return  options;
};
