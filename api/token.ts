import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_BASE_URL = 'https://proassisapp.com/proassislife/servicios';
const AUTH_TOKEN = 'QlUxdUxpTmZmbkEyV0tzMUphTVRRdy4uOmFBcEQwb3RrVS1vUzRYd21NQURRUHcuLg==';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Basic ${AUTH_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting token:', error);
    return res.status(500).json({
      error: 'Failed to get token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
