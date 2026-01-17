import { SITE_URL, SITE_NAME, generateWebSiteSchema } from "@/lib/seo";

interface WebSiteSchemaProps {
  searchUrl?: string; // e.g., "/search?q={search_term_string}"
}

/**
 * WebSite Schema with SearchAction
 * Enables Google search box in search results
 */
export function WebSiteSchema({ searchUrl }: WebSiteSchemaProps) {
  const schema = generateWebSiteSchema(
    searchUrl ? `${SITE_URL}${searchUrl}` : undefined
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
