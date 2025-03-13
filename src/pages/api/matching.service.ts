import { CareType } from './matchingRequest.dto';
import { MatchingResponse } from './matchingResponse.dto';

import { facilities } from '@/data/facilities';
import { FacilityMatch } from '@/types/Facility';

export function findMatchingFacility(
  careType: CareType,
  zipCode?: number
): MatchingResponse {
  const noFacilityFoundResponse: MatchingResponse = {
    status: 404,
    success: false,
    message: 'No match found.',
  };

  if (careType === 'dayCare') {
    return noFacilityFoundResponse;
  }

  let matchedFacility: FacilityMatch | null = null;
  let minDistance = Infinity;

  // Find the nearest available facility
  for (const facility of facilities) {
    if (
      facility.type.includes(careType) &&
      zipCode &&
      zipCode >= facility.servesZipCodes[0] &&
      zipCode <= facility.servesZipCodes[1] &&
      facility.capacity === 'Available'
    ) {
      const distance = Math.abs(zipCode - facility.zipCode);
      if (distance < minDistance) {
        matchedFacility = facility;
        minDistance = distance;
      }
    }
  }

  if (!matchedFacility || (zipCode && minDistance > 3000)) {
    return noFacilityFoundResponse;
  }

  return {
    status: 200,
    success: true,
    message: 'Match found.',
    matching: {
      zipCode: matchedFacility.zipCode,
      type: matchedFacility.type,
      name: matchedFacility.name,
      distance: minDistance,
    },
  };
}
