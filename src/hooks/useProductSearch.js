import { useState, useEffect } from 'react';

const useProductSearch = (searchTerm = '', page = 1, pageSize = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * pageSize; // Calculate skip based on page and pageSize
      const response = await fetch(
        `https://api.daaif.net/products/search?delay=1000&q=${searchTerm}&limit=${pageSize}&skip=${skip}`
      );
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total); // Total number of products
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, page, pageSize]);

  const reloadProducts = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / pageSize), // Calculate total pages
    reloadProducts,
  };
};

export default useProductSearch;