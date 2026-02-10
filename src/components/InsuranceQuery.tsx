import { useState } from 'react';
import { SearchForm } from './SearchForm';
import { ContractResults } from './ContractResults';
import { queryInsurance } from '../services/insuranceApi';
import type { Contrato } from '../types/insurance';
import './InsuranceQuery.css';

export function InsuranceQuery() {
  const [isLoading, setIsLoading] = useState(false);
  const [contratos, setContratos] = useState<Contrato[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (cedula: string) => {
    console.log('🚀 Iniciando búsqueda para cédula:', cedula);
    setIsLoading(true);
    setError(null);
    setContratos(null);

    try {
      const response = await queryInsurance(cedula);
      console.log('✅ Respuesta completa:', response);
      console.log('📊 Respuesta.dato:', response?.dato);
      console.log('🔢 Cantidad de contratos:', response?.dato?.length);
      if (response?.dato && response.dato.length > 0) {
        console.log('✅ Se encontraron contratos, mostrando resultados');
        setContratos(response.dato);
      } else {
        console.warn('⚠️ No se encontraron contratos');
        setError('No se encontraron contratos para la cédula ingresada.');
      }
    } catch (err) {
      console.error('❌ Error en handleSearch:', err);
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al consultar: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setContratos(null);
    setError(null);
  };

  return (
    <div className="insurance-query">
      {!contratos && (
        <>
          <div className="query-header">
            <div className="logo-container">
              <svg className="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h1>Consulta de Cobertura</h1>
            <p className="subtitle">Ingrese la cédula del asegurado para verificar su cobertura</p>
          </div>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="error-message">
              <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}
        </>
      )}

      {contratos && contratos.length > 0 && (
        <ContractResults contratos={contratos} onNewSearch={handleNewSearch} />
      )}
    </div>
  );
}
