'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let apiHost = process.env.HOST;

exports.putResponseWithAuth = (endPoint, token, body, host) => {
    return chai
        .request(apiHost)
        .put(endPoint)
        .set('Accept', 'application/json')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(body);
};

exports.postResponseWithAuth = (endPoint, token, body) => {
    return chai
        .request(apiHost)
        .post(endPoint)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(body);
};

exports.deleteResponseWithAuth = (endPoint, token, body) => {
    return chai
        .request(apiHost)
        .delete(endPoint)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(body);
};

exports.getResponse = (endPoint, body) => {
    return chai.request(apiHost).get(endPoint).set('content-type', 'application/json').send(body);
};

