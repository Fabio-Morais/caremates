import { MatchingRequest } from '@/pages/api/matchingRequest.dto';

export const submitMatchingForm = async (formData: MatchingRequest) => {
  try {
    const response = await fetch('/api/matching', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Failed to submit data');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
