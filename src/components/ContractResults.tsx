import type { Contrato } from '../types/insurance';
import './ContractResults.css';

interface ContractResultsProps {
  contratos: Contrato[];
  onNewSearch: () => void;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function ContractResults({ contratos, onNewSearch }: ContractResultsProps) {
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Resultados de la Consulta</h2>
        <button onClick={onNewSearch} className="new-search-btn">
          Nueva Búsqueda
        </button>
      </div>

      {contratos.map((contrato) => (
        <div key={contrato.Codigo} className="result-card">
          {/* Cabecera del Contrato */}
          <div className="result-card-header">
            <div className="header-left">
              <span className={`status-badge ${contrato.Estado?.toLowerCase()}`}>
                {contrato.Estado}
              </span>
              <div className="contract-title">
                <h3>{contrato.NombrePlan}</h3>
                <span className="contract-id">Contrato #{contrato.Codigo}</span>
              </div>
            </div>
            {contrato.EsMoroso && (
              <span className="moroso-badge">⚠️ MOROSO</span>
            )}
          </div>

          {/* Información Principal */}
          <div className="main-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Producto</span>
                <span className="value">{contrato.Producto}</span>
              </div>
              <div className="info-item">
                <span className="label">Vademécum</span>
                <span className="value">{contrato.Vademecum}</span>
              </div>
              <div className="info-item">
                <span className="label">Cobertura Máxima</span>
                <span className="value highlight">{contrato.CoberturaMaxima?.toLocaleString()}%</span>
              </div>
              <div className="info-item">
                <span className="label">Deducible</span>
                <span className="value">${contrato.DeducibleTotal?.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="label">Vigencia</span>
                <span className="value">
                  {formatDate(contrato.FechaInicio)} - {formatDate(contrato.FechaVigencia)}
                </span>
              </div>
            </div>
          </div>

          {/* Titular */}
          <div className="section">
            <h4>👤 Titular</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Nombre</span>
                <span className="value">{contrato.Titular.Nombres} {contrato.Titular.Apellidos}</span>
              </div>
              <div className="info-item">
                <span className="label">Cédula</span>
                <span className="value">{contrato.Titular.NumeroDocumento}</span>
              </div>
              <div className="info-item">
                <span className="label">Edad</span>
                <span className="value">{contrato.Titular.Edad} años</span>
              </div>
              <div className="info-item">
                <span className="label">Género</span>
                <span className="value">{contrato.Titular.Genero === 'M' ? 'Masculino' : 'Femenino'}</span>
              </div>
            </div>
          </div>

          {/* Beneficiarios */}
          {contrato.Beneficiarios && contrato.Beneficiarios.length > 0 && (
            <div className="section">
              <h4>👥 Beneficiarios ({contrato.Beneficiarios.length})</h4>
              <div className="beneficiaries-grid">
                {contrato.Beneficiarios.map((beneficiario) => (
                  <div key={beneficiario.NumeroPersona} className="beneficiary-item">
                    <div className="beneficiary-name">
                      <span className="relation-tag">{beneficiario.RelacionDependiente}</span>
                      <strong>{beneficiario.Nombres} {beneficiario.Apellidos}</strong>
                    </div>
                    <div className="beneficiary-details">
                      <span>{beneficiario.NumeroDocumento}</span>
                      <span>•</span>
                      <span>{beneficiario.Edad} años</span>
                      <span>•</span>
                      <span>{beneficiario.Genero === 'M' ? 'M' : 'F'}</span>
                    </div>
                    {beneficiario.BeneficiosPlan && beneficiario.BeneficiosPlan.length > 0 && (
                      <div className="benefits-compact">
                        {beneficiario.BeneficiosPlan.map((beneficio, idx) => (
                          <div key={idx} className="benefit-tag">
                            <span className="benefit-name">{beneficio.Nombre}</span>
                            <span className="benefit-percentage">{beneficio.Valor}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observaciones */}
          {contrato.Observaciones && (
            <div className="observations-compact">
              <strong>📋 Observaciones:</strong> {contrato.Observaciones}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
