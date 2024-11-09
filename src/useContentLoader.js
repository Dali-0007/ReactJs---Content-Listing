import { useState, useEffect } from 'react';
import axios from 'axios';

export const useContentLoader = (page, setPage, hasMore, setHasMore) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      const newItems = response.data.page["content-items"].content;
      setItems(prevItems => [...prevItems, ...newItems]);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  return items;
};
