import { useState, type FormEvent } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (cedula: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [cedula, setCedula] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cedula.trim()) {
      onSearch(cedula.trim());
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cedula">Cédula del Asegurado</label>
        <input
          type="text"
          id="cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Ingrese la cédula"
          disabled={isLoading}
          autoComplete="off"
        />
      </div>
      <button type="submit" disabled={isLoading || !cedula.trim()}>
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Consultando...
          </>
        ) : (
          'Consultar Cobertura'
        )}
      </button>
    </form>
  );
}
