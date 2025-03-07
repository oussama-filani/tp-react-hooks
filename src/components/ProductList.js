import React, { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from './../translations.js';


const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [page, setPage] = useState(1); // Current page
  const pageSize = 10; // Number of items per page
    const { language } = useContext(LanguageContext);
  

  const { products, loading, error, totalPages, currentPage, reloadProducts } = useProductSearch(searchTerm, page, pageSize);

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      Erreur: {error}
    </div>
  );

  return (
    <div>
      {/* Reload Button */}
      <button
        onClick={reloadProducts}
        className={`btn ${isDarkTheme ? 'btn-light' : 'btn-dark'} mb-4`}
      >
        Recharger les produits
      </button>

      {/* Product List */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{translations[language].price} </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} sur {totalPages}
            </span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;