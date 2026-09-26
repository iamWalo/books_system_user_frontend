const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const request = async (path) => {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
};

export const getProducts = () => request('/api/products');

export const getCategories = async () => {
    const response = await request('/api/categories');
    return response.data || [];
};

export const getSeries = async () => {
    const response = await request('/api/series');
    return response.data || [];
};

export const getBlogs = async (search = '') => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await request(`/api/blogs${query}`);
    return response.data || [];
};

export const getBlogCategories = async () => {
    const response = await request('/api/blogs/categories');
    return response.data || [];
};

export const getProduct = (id) => request(`/api/products/${id}`);

export const getBlog = async (id) => {
    const response = await request(`/api/blogs/${id}`);
    return response.data;
};

export const mediaUrl = (path) => {
    if (!path) return '';
    if (/^(https?:|data:|blob:)/.test(path)) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};