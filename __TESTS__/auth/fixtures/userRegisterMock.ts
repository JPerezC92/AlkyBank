import { UserEndpoint, UserRegister } from '@/Auth/schemas';

export const userRegisterMock: UserRegister = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@gmail.com',
	password: '123456aA-',
	confirmPassword: '123456aA-',
};

export const userEndpointMock: UserEndpoint = {
	...userRegisterMock,
	id: '123456a',
	createdAt: new Date(),
	updatedAt: new Date(),
};
