'use strict';

const faker = require('faker');

exports.getBody = () => {
    faker.locale = 'en_US';

    return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    gender: faker.random.arrayElement(['male', 'female']),
    email: faker.internet.email(),
    status:"active"
}};
