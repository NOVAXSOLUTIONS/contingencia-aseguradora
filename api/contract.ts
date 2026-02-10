import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_BASE_URL = 'https://proassisapp.com/proassislife/servicios';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cedula } = req.query;
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!cedula) {
    return res.status(400).json({ error: 'Cedula is required' });
  }

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/cuxibamba/obtenerContratoCoberturaV2/${cedula}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting contract info:', error);
    return res.status(500).json({
      error: 'Failed to get contract info',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
