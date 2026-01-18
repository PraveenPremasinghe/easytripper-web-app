/**
 * Email Protection Utilities
 * Protects email addresses from spam harvesters
 */

/**
 * Obfuscate email address to prevent spam harvesting
 * Converts email to a format that's harder for bots to detect
 */
export function obfuscateEmail(email: string): string {
  // Split email into parts
  const [localPart, domain] = email.split("@");
  
  // Convert to HTML entities
  const obfuscated = `${localPart}&#64;${domain}`;
  
  return obfuscated;
}

/**
 * Create a protected email link component
 * Returns an object with href and display text
 */
export function createEmailLink(email: string): {
  href: string;
  display: string;
  obfuscated: string;
} {
  return {
    href: `mailto:${email}`,
    display: email,
    obfuscated: obfuscateEmail(email),
  };
}

/**
 * Decode email from obfuscated format (for display)
 */
export function decodeEmail(obfuscated: string): string {
  return obfuscated.replace(/&#64;/g, "@");
}
