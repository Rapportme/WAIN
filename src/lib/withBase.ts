export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Ensure path starts with a slash
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}

export default withBase;
