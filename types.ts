export type RouteParams = { params: Promise<{ slug: string | string[] }> };

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
