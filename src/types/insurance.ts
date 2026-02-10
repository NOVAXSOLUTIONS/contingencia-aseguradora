export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface Titular {
  Numero: string;
  TipoDocumento: string;
  NumeroDocumento: string;
  Nombres: string;
  Apellidos: string;
  FechaNacimiento: string;
  Genero: string;
  Edad: number;
}

export interface BeneficioPlan {
  codigoBeneficio: string;
  Nombre: string;
  Valor: number;
  EsPorPlan: boolean;
}

export interface Beneficiario {
  NumeroPersona: number;
  TipoDocumento: string;
  NumeroDocumento: string;
  RelacionDependiente: string;
  Nombres: string;
  Apellidos: string;
  FechaNacimiento: string;
  Genero: string;
  Edad: number;
  BeneficiosPlan: BeneficioPlan[];
}

export interface Contrato {
  Region: string;
  Producto: string;
  Vademecum: string;
  Numero: string;
  CodigoPlan: number;
  Codigo: number;
  Estado: string;
  NombrePlan: string;
  Version: number;
  CoberturaMaxima: number;
  Titular: Titular;
  DeducibleTotal: number;
  EsMoroso: boolean;
  FechaInicio: string;
  FechaVigencia: string;
  Observaciones: string;
  Beneficiarios: Beneficiario[];
}

export interface ContractResponse {
  dato: Contrato[];
}

export interface ApiError {
  error: string;
  message?: string;
}
