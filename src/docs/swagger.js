import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bus Tracker API",
            version: "1.0.0",
            description: "A simple API for tracking buses",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs, {
        docExpansion: 'none'
    }));

    app.get("/api/v1/docs", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });

    console.log(`Swagger Docs running on http://localhost:${port}/api/v1/docs`);
}

export { swaggerDocs };
