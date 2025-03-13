import { findMatchingFacility } from '@/pages/api/matching.service';
import { MatchingResponse } from '@/pages/api/matchingResponse.dto';

describe('findMatchingFacility', () => {
  it('should return a no match when no available facilities exist within the range', () => {
    const response: MatchingResponse = findMatchingFacility('stationary', 8000);
    expect(response.status).toBe(404);
    expect(response.message).toBe('No match found.');
  });

  it('should return a 404 response when careType is dayCare', () => {
    const response: MatchingResponse = findMatchingFacility('dayCare', 15000);
    expect(response.status).toBe(404);
    expect(response.message).toBe('No match found.');
  });

  it('should return a 404 response when the nearest facility is more than 3000 zip codes away', () => {
    const response: MatchingResponse = findMatchingFacility(
      'stationary',
      50000
    );
    expect(response.status).toBe(404);
    expect(response.message).toBe('No match found.');
  });

  it('should return a 404 response when the facility is full', () => {
    const response: MatchingResponse = findMatchingFacility(
      'stationary',
      12000
    );
    expect(response.status).toBe(404);
    expect(response.message).toBe('No match found.');
  });

  it('should return a no match when the nearest ambulatory facility is too far', () => {
    const response: MatchingResponse = findMatchingFacility(
      'ambulatory',
      23000
    );
    expect(response.status).toBe(404);
    expect(response.message).toBe('No match found.');
  });

  it('should return a no match response if the nearest facility is too far and no others are available', () => {
    const response: MatchingResponse = findMatchingFacility(
      'stationary',
      29000
    );
    expect(response.status).toBe(404);
    expect(response.message).toBe('No match found.');
  });

  it('should return a 200 response with the correct matching facility when a match is found for stationary and zipCode 16000', () => {
    const response: MatchingResponse = findMatchingFacility(
      'stationary',
      16000
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe('Match found.');
    expect(response.match).toEqual({
      zipCode: 17000,
      type: ['stationary'],
      name: 'B',
      distance: 1000,
    });
  });

  it('should return a 200 response with the correct matching facility when a match is found for ambulatory and zipCode 25000', () => {
    const response: MatchingResponse = findMatchingFacility(
      'ambulatory',
      25000
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe('Match found.');
    expect(response.match).toEqual({
      zipCode: 27000,
      type: ['ambulatory'],
      name: 'D',
      distance: 2000,
    });
  });

  it('should return a 200 response with the correct matching facility when multiple facilities match', () => {
    const response: MatchingResponse = findMatchingFacility(
      'ambulatory',
      19000
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe('Match found.');
    expect(response.match).toEqual({
      zipCode: 18000,
      type: ['stationary', 'ambulatory'],
      name: 'E',
      distance: 1000, // 19000 - 18000 = 1000
    });
  });

  it('should return a 200 response with the correct matching facility when the facility serves multiple care types', () => {
    const response: MatchingResponse = findMatchingFacility(
      'ambulatory',
      18000
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe('Match found.');
    expect(response.match).toEqual({
      zipCode: 18000,
      type: ['stationary', 'ambulatory'],
      name: 'E',
      distance: 0,
    });
  });

  it('should return a match when the selected care type is available and within 3000 zip code range', () => {
    const response: MatchingResponse = findMatchingFacility(
      'stationary',
      18000
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe('Match found.');
    expect(response.match).toEqual({
      zipCode: 18000,
      type: ['stationary', 'ambulatory'],
      name: 'E',
      distance: 0, // Exact match
    });
  });

  it('should return the closest available stationary facility even if other care types are present', () => {
    const response: MatchingResponse = findMatchingFacility(
      'stationary',
      17000
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe('Match found.');
    expect(response.match).toEqual({
      zipCode: 17000,
      type: ['stationary'],
      name: 'B',
      distance: 0,
    });
  });
});
