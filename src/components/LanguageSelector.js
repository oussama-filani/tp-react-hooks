import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <select
      style={{ width: '200px' }} 
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className={`form-select ${language === 'fr' ? 'bg-light text-dark' : ''}`}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;