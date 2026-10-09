export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function isValidSlug(slug: string): boolean {
  // Allow alphanumeric and single hyphens, 3 to 48 characters
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slug.length >= 3 && slug.length <= 48 && slugRegex.test(slug);
}
