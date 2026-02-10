import type { Contrato } from '../types/insurance';
import './ResultModal.css';

interface ResultModalProps {
  contratos: Contrato[];
  onClose: () => void;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function ResultModal({ contratos, onClose }: ResultModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Información de Cobertura</h2>
          <button className="close-button" onClick={onClose} aria-label="Cerrar">
            &times;
          </button>
        </div>

        <div className="modal-body">
          {contratos.map((contrato, index) => (
            <div key={contrato.Codigo || index} className="contract-card">
              <div className="contract-header">
                <span className={`status-badge ${contrato.Estado?.toLowerCase()}`}>
                  {contrato.Estado || 'N/A'}
                </span>
                <span className="contract-number">
                  Contrato: {contrato.Codigo}
                </span>
              </div>

              <div className="contract-info">
                <div className="info-row">
                  <span className="info-label">Plan:</span>
                  <span className="info-value">{contrato.NombrePlan}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Producto:</span>
                  <span className="info-value">{contrato.Producto}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Vademécum:</span>
                  <span className="info-value">{contrato.Vademecum}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Cobertura Máxima:</span>
                  <span className="info-value">{contrato.CoberturaMaxima?.toLocaleString()}%</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Deducible Total:</span>
                  <span className="info-value">${contrato.DeducibleTotal?.toLocaleString()}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Vigencia:</span>
                  <span className="info-value">
                    {formatDate(contrato.FechaInicio)} - {formatDate(contrato.FechaVigencia)}
                  </span>
                </div>
                {contrato.EsMoroso && (
                  <div className="info-row alert">
                    <span className="info-label">Estado:</span>
                    <span className="info-value warning">MOROSO</span>
                  </div>
                )}
              </div>

              {/* Información del Titular */}
              <div className="titular-section">
                <h3>Titular</h3>
                <div className="contract-info">
                  <div className="info-row">
                    <span className="info-label">Nombre:</span>
                    <span className="info-value">
                      {contrato.Titular.Nombres} {contrato.Titular.Apellidos}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Cédula:</span>
                    <span className="info-value">{contrato.Titular.NumeroDocumento}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Fecha Nacimiento:</span>
                    <span className="info-value">{formatDate(contrato.Titular.FechaNacimiento)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Edad:</span>
                    <span className="info-value">{contrato.Titular.Edad} años</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Género:</span>
                    <span className="info-value">{contrato.Titular.Genero === 'M' ? 'Masculino' : 'Femenino'}</span>
                  </div>
                </div>
              </div>

              {/* Beneficiarios */}
              {contrato.Beneficiarios && contrato.Beneficiarios.length > 0 && (
                <div className="beneficiaries-section">
                  <h3>Beneficiarios ({contrato.Beneficiarios.length})</h3>
                  {contrato.Beneficiarios.map((beneficiario) => (
                    <div key={beneficiario.NumeroPersona} className="beneficiary-card">
                      <div className="beneficiary-header">
                        <span className="relation-badge">{beneficiario.RelacionDependiente}</span>
                        <span className="beneficiary-name">
                          {beneficiario.Nombres} {beneficiario.Apellidos}
                        </span>
                      </div>
                      <div className="beneficiary-info">
                        <div className="info-row">
                          <span className="info-label">Cédula:</span>
                          <span className="info-value">{beneficiario.NumeroDocumento}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Edad:</span>
                          <span className="info-value">{beneficiario.Edad} años</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Género:</span>
                          <span className="info-value">{beneficiario.Genero === 'M' ? 'Masculino' : 'Femenino'}</span>
                        </div>
                      </div>

                      {/* Beneficios del Plan */}
                      {beneficiario.BeneficiosPlan && beneficiario.BeneficiosPlan.length > 0 && (
                        <div className="benefits-section">
                          <h4>Beneficios</h4>
                          <div className="benefits-list">
                            {beneficiario.BeneficiosPlan.map((beneficio, idx) => (
                              <div key={beneficio.codigoBeneficio || idx} className="benefit-item">
                                <div className="benefit-name">
                                  <span className="benefit-code">{beneficio.codigoBeneficio}</span>
                                  <span>{beneficio.Nombre}</span>
                                </div>
                                <div className="benefit-value">
                                  {beneficio.Valor}%
                                  {beneficio.EsPorPlan && <span className="plan-badge">Por Plan</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {contrato.Observaciones && (
                <div className="observations">
                  <strong>Observaciones:</strong> {contrato.Observaciones}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
