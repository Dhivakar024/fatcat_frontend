/**
 * FatCat Wealthy - Global Production API Client Configuration
 * Connected to Production FastAPI Backend on Render:
 * https://fatcat-backend.onrender.com
 */
const FATCAT_API = (() => {
    const PRODUCTION_SERVER = "https://fatcat-backend.onrender.com";
    const BASE_URL = "https://fatcat-backend.onrender.com/api";

    function getAuthHeaders(isAdmin = false) {
        const token = isAdmin
            ? localStorage.getItem("fatcat_admin_token")
            : localStorage.getItem("fatcat_token");

        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    }

    return {
        SERVER_URL: PRODUCTION_SERVER,
        BASE_URL: BASE_URL,
        getAuthHeaders,

        // Helper for standard JSON API requests
        async request(endpoint, options = {}) {
            let path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
            if (path.startsWith("/api/")) {
                path = path.slice(4);
            }
            const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
            const res = await fetch(url, options);
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                const errorMsg = data.detail || data.message || `Request failed with status ${res.status}`;
                const err = new Error(errorMsg);
                err.status = res.status;
                err.data = data;
                throw err;
            }
            return data;
        }
    };
})();

if (typeof window !== "undefined") {
    window.FATCAT_API = FATCAT_API;
}
