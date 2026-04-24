const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';

export async function fetchHealth() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error('Unable to fetch backend health.');
  }

  return response.json();
}
