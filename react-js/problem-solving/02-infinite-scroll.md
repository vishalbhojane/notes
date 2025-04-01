```jsx
import React, {useState, useEffect, useRef} from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const pivotRef = useRef(null);

  // Fetch data function
  const fetchData = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          page * 10
        }&select=title,price`
      );
      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => [...prev, ...data.products]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Initialize intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchData();
        }
      },
      {threshold: 0.1}
    );

    if (pivotRef.current) {
      observer.observe(pivotRef.current);
    }

    // Cleanup observer
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array - create observer only once

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="products-grid">
        {items.map((item) => (
          <div key={item.id} className="product-card">
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
        ))}
      </div>

      {/* Pivot Element */}
      {hasMore && (
        <div ref={pivotRef} className="pivot">
          {loading && <div className="loader">Loading...</div>}
        </div>
      )}

      {!hasMore && <div className="end-message">No more products to load</div>}
    </div>
  );
};

export default InfiniteScroll;
```
