import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Grid.css';

const Grid = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      const newItems = response.data.page["content-items"].content;
      setItems(prevItems => [...prevItems, ...newItems]);
      setPage(page + 1);

      if (newItems.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItems = filteredItems.map((item, index) => (
    <div className="grid-item" key={index}>
      <img
        src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
        alt={item.name}
        className="grid-image"
      />
      <p>{item.name}</p>
    </div>
  ));

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchItems}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      scrollThreshold={0.9}
      className="content-grid"
    >
      {renderItems}
    </InfiniteScroll>
  );
};

export default Grid;


