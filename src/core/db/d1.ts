import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';

// Minimal D1Database type to avoid pulling in @cloudflare/workers-types globally,
// which overrides built-in types like Response.json() and breaks non-Workers code.
type D1Database = {
  prepare(query: string): any;
  batch(statements: any[]): Promise<any[]>;
  exec(query: string): Promise<any>;
  dump(): Promise<ArrayBuffer>;
};

// D1 singleton instance (reused across requests in the same isolate)
let d1DbInstance: ReturnType<typeof drizzle> | null = null;

/**
 * Get the D1 database binding from Cloudflare Workers environment.
 *
 * Uses `getCloudflareContext()` from @opennextjs/cloudflare.
 * During build/static rendering this will throw — callers should
 * handle the error gracefully (e.g. config.ts already catches it).
 */
function getD1Binding(): D1Database {
  const { env }: { env: any } = getCloudflareContext();

  if (env?.DB) return env.DB;

  throw new Error(
    'D1 database binding "DB" not found. Make sure [[d1_databases]] is configured in wrangler.toml with binding = "DB".'
  );
}

export function getD1Db() {
  if (d1DbInstance) return d1DbInstance;

  const binding = getD1Binding();
  d1DbInstance = drizzle(binding);
  return d1DbInstance;
}
