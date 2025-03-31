const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://tools.qa.ale.ai/api/tools/candidates';

export async function fetchCandidateLevels(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/levels`);

    if (!response.ok) {
      throw new Error(`Failed to fetch candidate levels: ${response.status}`);
    }

    const data = await response.json();
    return data.levels;
  } catch (error) {
    console.error('Error fetching candidate levels:', error);
    throw error;
  }
}
