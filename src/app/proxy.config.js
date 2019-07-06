const PROXY_CONFIG = [
    {
        context: [
            "/login",
            "/v1/rooms",
            "/v1/users"
        ],
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
    }
  ]
module.exports = PROXY_CONFIG;

  