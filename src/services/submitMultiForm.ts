import { MatchingRequest } from '@/pages/api/matchingRequest.dto';

/**
 * Submit the matching form data to the server
 * @param formData The matching form data
 * @returns The response from the server
 */
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
