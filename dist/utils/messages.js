"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.errors = void 0;
exports.errors = {
    users: {
        notFound: 'User not found',
        alreadyExists: 'User already exists',
    },
    favourite: {
        notFound: 'Favourite not found',
        alreadyExists: 'Favourite already exists',
    },
    common: {
        params: 'Invalid params',
        notFound: 'Not found',
    },
};
exports.info = {
    database: {
        connected: 'Database connected',
        served: 'Served from database',
    },
    redis: {
        connected: 'Redis connected',
        served: 'Served from redis',
    },
};
//# sourceMappingURL=messages.js.map