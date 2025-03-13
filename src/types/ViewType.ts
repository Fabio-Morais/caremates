import { MatchingResponse } from '@/pages/api/matchingResponse.dto';

export type View = 'form' | 'result';

export type ViewState = {
  view: View;
  result: MatchingResponse | null;
};
