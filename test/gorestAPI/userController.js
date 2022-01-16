'use strict';

const chai = require('chai');
const expect = chai.expect;
const assert = require('soft-assert');
const helpers = require('../../support/helpers');
const userData = require('../../testData/userData.js');
const token = process.env.TOKEN;

describe('User Controller - User tests', () => {
    let userBody, resCreatedUser, userId;

    context('User process', () => {

        beforeEach('Precondition : create User ', async () => {
            userBody = userData.getBody();
            resCreatedUser = await helpers.postResponseWithAuth(`/users`, token, userBody);
            expect(resCreatedUser, JSON.stringify(resCreatedUser.body)).to.have.status(201);
            expect(resCreatedUser.body.data.id).not.be.undefined
            userId = resCreatedUser.body.data.id;
        });

        it('POST - created user verification data', async () => {
            assert.softAssert(resCreatedUser.body.data.name, userBody.name);
            assert.softAssert(resCreatedUser.body.data.email, userBody.email);
            assert.softAssert(resCreatedUser.body.data.gender, userBody.gender);
            assert.softAssert(resCreatedUser.body.data.status, userBody.status);
            assert.softAssertAll();
        });

        it('GET - created user verification data ', async () => {
            const res = await helpers.getResponse(`/users/${userId}`);
            expect(res, JSON.stringify(res.body)).to.have.status(200);

            assert.softAssert(res.body.data.id, userId);
            assert.softAssert(res.body.data.email, userBody.email);
            assert.softAssert(res.body.data.email, userBody.email);
            assert.softAssert(res.body.data.gender, userBody.gender);
            assert.softAssert(res.body.data.status, userBody.status);
            assert.softAssertAll();
        });

        it('PUT - update created user verification data ', async () => {
            const newUserBody = userData.getBody();
            let res = await helpers.putResponseWithAuth(`/users/${userId}`, token, newUserBody);
            expect(res, JSON.stringify(res.body)).to.have.status(200);

            res = await helpers.getResponse(`/users/${userId}`);
            expect(res, JSON.stringify(res.body)).to.have.status(200);

            assert.softAssert(res.body.data.id, userId);
            assert.softAssert(res.body.data.email, newUserBody.email);
            assert.softAssert(res.body.data.email, newUserBody.email);
            assert.softAssert(res.body.data.gender, newUserBody.gender);
            assert.softAssert(res.body.data.status, newUserBody.status);
            assert.softAssertAll();
        });

        afterEach('Delete User', async () => {
            const resDeleteUser = await helpers.deleteResponseWithAuth(`/users/${userId}`, token);
            expect(resDeleteUser, JSON.stringify(resDeleteUser.body)).to.have.status(204);

            const res = await helpers.getResponse(`/users/${userId}`);
            expect(res, JSON.stringify(res.body)).to.have.status(404);
        });
    });
    context('Create user negative tests', () => {

        it('POST - created user empty name', async () => {
            userBody = userData.getBody();
            userBody.name = '';
            resCreatedUser = await helpers.postResponseWithAuth(`/users`, token, userBody);
            expect(resCreatedUser, JSON.stringify(resCreatedUser.body)).to.have.status(422);

            assert.softAssert(resCreatedUser.body.data[0].field, 'name');
            assert.softAssert(resCreatedUser.body.data[0].message, 'can\'t be blank');
            assert.softAssertAll();
        });

        it('POST - created user wrong gender', async () => {
            userBody = userData.getBody();
            userBody.gender = 'blablabla';
            resCreatedUser = await helpers.postResponseWithAuth(`/users`, token, userBody);
            expect(resCreatedUser, JSON.stringify(resCreatedUser.body)).to.have.status(422);

            assert.softAssert(resCreatedUser.body.data[0].field, 'gender');
            assert.softAssert(resCreatedUser.body.data[0].message, 'can\'t be blank');
            assert.softAssertAll();
        });

        it('POST - created user wrong gender', async () => {
            userBody = userData.getBody();
            userBody.email = 'blablabla';
            resCreatedUser = await helpers.postResponseWithAuth(`/users`, token, userBody);
            expect(resCreatedUser, JSON.stringify(resCreatedUser.body)).to.have.status(422);

            assert.softAssert(resCreatedUser.body.data[0].field, 'email');
            assert.softAssert(resCreatedUser.body.data[0].message, 'is invalid');
            assert.softAssertAll();
        });

        it('POST - created user wrong gender', async () => {
            userBody = userData.getBody();
            userBody.status = 'blablabla';
            resCreatedUser = await helpers.postResponseWithAuth(`/users`, token, userBody);
            expect(resCreatedUser, JSON.stringify(resCreatedUser.body)).to.have.status(422);

            assert.softAssert(resCreatedUser.body.data[0].field, 'status');
            assert.softAssert(resCreatedUser.body.data[0].message, 'can\'t be blank');
            assert.softAssertAll();
        });
    });
    context('Update user negative tests', () => {

        before('Precondition : create User ', async () => {
            userBody = userData.getBody();
            resCreatedUser = await helpers.postResponseWithAuth(`/users`, token, userBody);
            expect(resCreatedUser, JSON.stringify(resCreatedUser.body)).to.have.status(201);
            expect(resCreatedUser.body.data.id).not.be.undefined
            userId = resCreatedUser.body.data.id;
        });

        it('PUT - update created  user empty name', async () => {
            const newUserBody = userData.getBody();
            newUserBody.name = '';

            const res = await helpers.putResponseWithAuth(`/users/${userId}`, token, newUserBody);
            expect(res, JSON.stringify(resCreatedUser.body)).to.have.status(422);

            assert.softAssert(res.body.data[0].field, 'name');
            assert.softAssert(res.body.data[0].message, 'can\'t be blank');
            assert.softAssertAll();
        });

        it('PUT - update created  user wrong gender', async () => {
            const newUserBody = userData.getBody();
            newUserBody.gender = 'blablabla';

            const res = await helpers.putResponseWithAuth(`/users/${userId}`, token, newUserBody);
            expect(res, JSON.stringify(res.body)).to.have.status(422);

            assert.softAssert(res.body.data[0].field, 'gender');
            assert.softAssert(res.body.data[0].message, 'can\'t be blank');
            assert.softAssertAll();
        });

        it('PUT - update created user wrong gender', async () => {
            const newUserBody = userData.getBody();
            newUserBody.email = 'blablabla';

            const res = await helpers.putResponseWithAuth(`/users/${userId}`, token, newUserBody);
            expect(res, JSON.stringify(res.body)).to.have.status(422);

            assert.softAssert(res.body.data[0].field, 'email');
            assert.softAssert(res.body.data[0].message, 'is invalid');
            assert.softAssertAll();
        });

        it('PUT - update created  user wrong gender', async () => {
            const newUserBody = userData.getBody();
            newUserBody.status = 'blablabla';

            const res = await helpers.putResponseWithAuth(`/users/${userId}`, token, newUserBody);
            expect(res, JSON.stringify(res.body)).to.have.status(422);

            assert.softAssert(res.body.data[0].field, 'status');
            assert.softAssert(res.body.data[0].message, 'can\'t be blank');
            assert.softAssertAll();
        });

        after('Delete User', async () => {
            const resDeleteUser = await helpers.deleteResponseWithAuth(`/users/${userId}`, token);
            expect(resDeleteUser, JSON.stringify(resDeleteUser.body)).to.have.status(204);

            const res = await helpers.getResponse(`/users/${userId}`);
            expect(res, JSON.stringify(res.body)).to.have.status(404);
        });
    });
});
