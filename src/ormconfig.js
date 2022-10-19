"use strict";
exports.__esModule = true;
var config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'root',
    database: 'po_editor',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
};
exports["default"] = config;
