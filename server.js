const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Health check
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            app: "AI Studio",
            message: "Backend is running!"
        }));

        return;
    }

    // Simple API test
    if (req.method === "POST" && req.url === "/api/test") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            let data = {};

            try {
                data = body ? JSON.parse(body) : {};
            } catch (error) {
                data = {};
            }

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: true,
                message: "AI Studio backend connected!",
                received: data
            }));
        });

        return;
    }

    // Not found
    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        success: false,
        message: "Route not found"
    }));
});

server.listen(PORT, () => {
    console.log(`AI Studio backend running on port ${PORT}`);
});