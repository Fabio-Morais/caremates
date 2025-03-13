// pages/api/matching.ts
import { findMatchingFacility } from './matching.service';
import { MatchingRequestSchema } from './matchingRequest.dto';
import { MatchingResponse } from './matchingResponse.dto';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// Add this export to specify Edge runtime
export const config = {
  runtime: 'edge',
};

const app = new Hono();

app.post('/api/matching', async (c) => {
  const body = await c.req.json();

  // Validate the request body against the schema
  const result = MatchingRequestSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      { message: 'Validation failed', errors: result.error.errors },
      400
    );
  }

  const { patientName, careType, zipCode } = result.data;

  // Call your business logic
  const matchResult: MatchingResponse = findMatchingFacility(careType, zipCode);

  return c.json({
    status: matchResult.status,
    message: matchResult.message,
    match: matchResult.matching,
  });
});

// Export the handler function for Next.js
export default handle(app);
