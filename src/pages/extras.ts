import type React from 'react';
import { MPBusiness, MPPlay, MPResearch } from './melting-pot/MeltingPotStory';

/**
 * Project-specific sections that slot into the shared case study layout.
 * research replaces the generic research row; the others are added after it.
 */
export const CASE_EXTRAS: Record<string, { research?: React.FC; afterResearch?: React.FC; afterDecisions?: React.FC }> = {
  'melting-pot': { research: MPResearch, afterResearch: MPPlay, afterDecisions: MPBusiness },
};
