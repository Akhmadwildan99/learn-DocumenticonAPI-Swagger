const express = require('express');
const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(cors())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "List Books Open API with Express",
            version: "1.0.0",
            description: 
            "This is a simple CRUD open API list of books"

        },
        servers: [
            {
                url: "http://localhost:3000/"
            },
        ],
    },
    apis: ["./routes/books.js"]
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs/",
    swaggerUi.serve,
    swaggerUi.setup(specs)
)

const router = require('./routes/books')
app.use('/books', router)


app.listen(PORT, () => console.log(`This Server listening in port http://localhost:${PORT}`));