import 'dotenv/config'

import express, { Application } from "express";
import { SequelizeConnection } from "./src/services/sequelize";
import Author from "./src/models/author";
import Book from "./src/models/book";

const port = 3015;
// New express application instance
const app: Application = express();

/**
 * Initialize sequelize connection and set singleton instance
 */
SequelizeConnection.getInstance();

/**
 * Route to get all books with authors, this should be avoided routes and business logic should be in separated
 * specific folder and files.
 */
app.get("/books", async (req, res) => {
    /**
     * Get all books from the database as raw objects (avoid getting sequelize fields),
     * including the author relation and add the author object to the js object returned.
     */
    const allBooks = await Book.findAll({
        // Avoid getting sequelize fields
        raw: true,
        // Name of the relation set in model
        include: ['author'],
        // Add the relation to the returned objects
        nest: true,
    });

    res.status(200).send(allBooks)
})

/**
 * Begin listening on port selected
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
