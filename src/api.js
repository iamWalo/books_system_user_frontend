const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000')
    .replace(/\/+$/, '');
const BACKEND_BASE_URL = (import.meta.env.VITE_BACKEND_URL || API_BASE_URL)
    .replace(/\/+$/, '');

const request = async (path) => {
    const response = await fetch(`${API_BASE_URL}${path}`);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(payload?.message || `API request failed: ${response.status}`);
    }

    return payload;
};

export const getProducts = async () => {
    const response = await request('/api/products');
    return Array.isArray(response?.data) ? response.data : [];
};

export const getCategories = async () => {
    const response = await request('/api/categories');
    return Array.isArray(response) ? response : [];
};

export const getSeries = async () => {
    const response = await request('/api/series');
    return Array.isArray(response) ? response : [];
};

export const getBlogs = async (search = '') => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await request(`/api/blogs${query}`);
    return Array.isArray(response?.data) ? response.data : [];
};

export const getBlogCategories = async () => {
    const response = await request('/api/blogs/categories');
    return Array.isArray(response?.data) ? response.data : [];
};

export const getProduct = async (id) => {
    const response = await request(`/api/products/${encodeURIComponent(id)}`);
    return response?.data ?? null;
};

export const getBlog = async (id) => {
    const response = await request(`/api/blogs/${encodeURIComponent(id)}`);
    return response?.data ?? null;
};

export const getImageUrl = (path) => {
    if (!path) return '';
    if (/^(https?:|data:|blob:)/.test(path)) return path;
    return `${BACKEND_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const mediaUrl = getImageUrl;