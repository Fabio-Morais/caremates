import { findMatchingFacility } from './matching.service';
import { MatchingRequestSchema } from './matchingRequest.dto';
import { MatchingResponse } from './matchingResponse.dto';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge',
};

const app = new Hono();

app.post('/api/matching', async (c) => {
  let body;

  try {
    body = await c.req.json();
  } catch {
    return c.json({ message: 'Invalid JSON format' }, 400);
  }

  // Validate the request body against the schema
  const result = MatchingRequestSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      { message: 'Validation failed', errors: result.error.errors },
      400
    );
  }

  const { firstName, lastName, careType, zipCode } = result.data;

  console.log(`Received request for ${firstName} ${lastName}`);

  const matchResult: MatchingResponse = findMatchingFacility(
    careType,
    Number(zipCode)
  );

  return c.json({
    status: matchResult.status,
    message: matchResult.message,
    match: matchResult.match,
  });
});

export default handle(app);
