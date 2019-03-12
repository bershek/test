export default function ApiCreator(baseUrl) {
    const fetchCreator = method => (url, options) => fetch(`${baseUrl}/${url}`, {
        method,
        ...options,
    }).then(data => data.json());

    return {
        get: fetchCreator('GET'),
        post: fetchCreator('POST'),
        patch: fetchCreator('PATCH'),
        delete: fetchCreator('DELETE'),
        put: fetchCreator('PUT'),
    };
}
