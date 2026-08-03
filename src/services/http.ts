/* ============================================================
   Simulated transport layer.
   Every content request passes through here so swapping the
   mock for a real REST client later is a one-file change.
   ============================================================ */

export interface ApiResponse<T> {
  data: T;
  meta: {
    simulated: true;
    latencyMs: number;
  };
}

const SIMULATED_LATENCY = 120;

async function simulateLatency(ms = SIMULATED_LATENCY): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function get<T>(loader: () => T): Promise<ApiResponse<T>> {
  await simulateLatency();
  return {
    data: loader(),
    meta: { simulated: true, latencyMs: SIMULATED_LATENCY },
  };
}

export function makeSlugId(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
