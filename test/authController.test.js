import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { signUpController, logInController } from '../auth/authController.js';

const { expect } = chai;
chai.use(sinonChai);

describe('signUpController', () => {
    let req, res, mockAuthServices;

    beforeEach(() => {
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            },
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        mockAuthServices = {
            getUserFromEmail: sinon.stub(),
            signUpUserService: sinon.stub(),
        };
    });

    it('should return 400 if user already exists', async () => {
        mockAuthServices.getUserFromEmail.resolves({ email: 'test@example.com' });

        const controller = signUpController(mockAuthServices);
        await controller(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({
            message: 'User Already Exists',
            success: false,
        });
    });

    it('should register a new user successfully', async () => {
        mockAuthServices.getUserFromEmail.resolves(null);
        mockAuthServices.signUpUserService.resolves();

        const controller = signUpController(mockAuthServices);
        await controller(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
            message: 'User registered successfully',
            success: true,
        });
    });

    it('should handle errors and return 500', async () => {
        mockAuthServices.getUserFromEmail.rejects(new Error('Database error'));

        const controller = signUpController(mockAuthServices);
        await controller(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({
            message: 'Database error',
            success: false,
        });
    });
});


describe('logInController', () => {
    let req, res, mockAuthServices;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        mockAuthServices = {
            getUserFromEmail: sinon.stub(),
            loginService: sinon.stub(),
        };
    });

    it('should return 400 if user does not exist', async () => {
        mockAuthServices.getUserFromEmail.resolves(null);

        const controller = logInController(mockAuthServices);
        await controller(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({
            message: 'User Does Not Exist',
            success: false,
        });
    });

    it('should log in a user successfully', async () => {
        const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
        const mockLoggedInData = { token: 'mockToken' };

        mockAuthServices.getUserFromEmail.resolves(mockUser);
        mockAuthServices.loginService.resolves(mockLoggedInData);

        const controller = logInController(mockAuthServices);
        await controller(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith({
            message: 'Logged in successfully',
            success: true,
            data: mockLoggedInData,
        });
    });

    it('should handle errors and return 500', async () => {
        mockAuthServices.getUserFromEmail.rejects(new Error('Database error'));

        const controller = logInController(mockAuthServices);
        await controller(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({
            message: 'Database error',
            success: false,
        });
    });
});
