/**
 * Transform camel case to lower case and separate words with space.
 */
export function normalCase(text: string): string {
  return text.replace(/([A-Z])/g,' $1').toLowerCase();
}