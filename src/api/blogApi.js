import axiosClient from "./axiosClient";

export const BLOG_CATEGORIES = [
  "Hospital Bills",
  "Financial Assistance",
  "Medical Debt",
  "Patient Rights",
  "Saving Money",
  "Success Stories",
];

/**
 * List published blog posts.
 * @param {{ category?: string, search?: string, page?: number, limit?: number }} params
 */
export async function fetchBlogs(params = {}) {
  const res = await axiosClient.get("/blogs", { params });
  return res.data; // { success, data, featured, pagination }
}

/** Fetch a single published post by slug (returns { data, related }). */
export async function fetchBlogBySlug(slug) {
  const res = await axiosClient.get(`/blogs/slug/${slug}`);
  return res.data;
}
