import Author from "./author";

import * as crypto from "crypto";

import { DataTypes, ForeignKey, Model, NonAttribute } from "sequelize";
import { SequelizeConnection } from "../services/sequelize";

export default class Book extends Model {
    declare id: number;

    declare name: string;

    // Foreign key making the relation between a book and an author
    declare authorId: ForeignKey<Author["id"]>;

    // Field that will contain relation, it's not counted as an attribute of the table
    declare author: NonAttribute<Author>;
}

// Get sequelize connection
const sequelizeConnection = SequelizeConnection.getInstance();

/**
 * Initialize model, define sequelize connection, the name of the table, it's attributes and relations
 */
Book.init(
    {
        id: {
            field: "id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
            unique: true,
        },
        authorId: {
            field: "authorId",
            type: DataTypes.INTEGER,
            references: {
                model: "authors",
                key: "id",
            },
        },
    },
    {
        sequelize:  sequelizeConnection,
        tableName: "books",
        modelName: "Book",
    },
);

/**
 * Both sides of the relation must be in the same file to avoid getting errors,
 * make sure both models are available in sequelizeConnection.models if one of the
 * models is not added to this object then your seqquelize connection is being initialized
 * more than one time, use include: ['author'] when fetching for books to include the relation
 */
Book.belongsTo(Author, {
    foreignKey: "authorId",
    as: "author",
});

Author.hasMany(Book, {
    sourceKey: "id",
    foreignKey: "authorId",
    as: "books",
});

// Will create the table automatically if it's not found
Book.sync().then();
