import {DataTypes, Model} from "sequelize";
import {SequelizeConnection} from "../services/sequelize";

export default class Author extends Model {
    declare id: number;

    declare name: string;

    declare lastName: string;
}

// Get sequelize connection
const sequelizeConnection = SequelizeConnection.getInstance();

/**
 * Initialize model, define sequelize connection, the name of the table, it's attributes and relations
 */
Author.init(
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
        },
        lastName: {
            field: 'lastName',
            type: DataTypes.STRING,
        },
    },
    {
        sequelize:  sequelizeConnection,
        tableName: "authors",
        modelName: "Author",
    },
);

// Will create the table automatically if it's not found
Author.sync().then();
