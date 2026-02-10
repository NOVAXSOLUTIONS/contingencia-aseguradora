import type { TokenResponse, ContractResponse } from '../types/insurance';

// En desarrollo usa el proxy de Vite, en producción usa las serverless functions
const isDev = import.meta.env.DEV;

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function fetchAccessToken(): Promise<string | null> {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('✅ Usando token en caché');
    return cachedToken;
  }

  console.log('🔑 Solicitando nuevo token...');

  try {
    const url = isDev ? '/api/proassis/oauth/token' : '/api/token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Respuesta token:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: TokenResponse = await response.json();
    console.log('🎫 Token obtenido:', data);

    if (data?.access_token) {
      cachedToken = data.access_token;
      // Cache token for slightly less than its expiry time
      tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
      return cachedToken;
    }

    return null;
  } catch (error) {
    console.error('❌ Error al obtener el token:', error);
    throw error;
  }
}

export async function fetchContractInfo(cedula: string, token: string): Promise<ContractResponse> {
  console.log('🔍 Consultando contrato para cédula:', cedula);

  try {
    const url = isDev
      ? `/api/proassis/cuxibamba/obtenerContratoCoberturaV2/${cedula}`
      : `/api/contract?cedula=${cedula}`;

    console.log('📍 URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('📡 Respuesta contrato:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: ContractResponse = await response.json();
    console.log('📦 Datos recibidos:', data);
    console.log('📋 Contratos encontrados:', data?.dato?.length || 0);

    return data;
  } catch (error) {
    console.error('❌ Error al obtener la información del contrato:', error);
    throw error;
  }
}

export async function queryInsurance(cedula: string): Promise<ContractResponse | null> {
  const token = await fetchAccessToken();

  if (!token) {
    throw new Error('No se pudo obtener el token de autenticación');
  }

  return fetchContractInfo(cedula, token);
}

export function clearTokenCache(): void {
  cachedToken = null;
  tokenExpiry = null;
}
