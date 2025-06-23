```jsx
import React from 'react';
import './Pagination.css';

const Pagination = ({
  numberOfItems,
  itemsPerPage,
  activePage,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      {Array.from(
        {length: Math.ceil(numberOfItems / itemsPerPage)},
        (_, index) => (
          <span
            key={index}
            className={`pagination-item ${
              index === activePage ? 'active-page' : ''
            }`}
            onClick={() => onPageChange(index)}
          >
            {index + 1}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
```

```jsx
import {useEffect, useState} from 'react';
import Pagination from './Pagination';
const ITEMS_PER_PAGE = 10;

const ProductListing = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=1000');
    const json = await res.json();
    setData(json.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Pagination
        numberOfItems={data.length}
        itemsPerPage={ITEMS_PER_PAGE}
        activePage={activePage}
        onPageChange={page => setActivePage(page)}
      />
      {data
        .slice(
          activePage * ITEMS_PER_PAGE,
          activePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
        .map(item => (
          <div>
            <div>{item.title}</div>
          </div>
        ))}
    </>
  );
};

export default ProductListing;
```
