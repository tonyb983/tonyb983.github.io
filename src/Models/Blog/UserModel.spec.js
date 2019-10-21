import { User, UserStore, UserSettings } from './UserModel';

describe('User Model Tests', () => {
  it('Can create a new User', () => {
    const user = User.create({ login: 'user@test.com', password: 'badpassword' });

    expect(user).toBeDefined();
    expect(user.login).toBe('user@test.com');
    expect(user.password).toBe('badpassword');
  });
});

describe('User Store Model Tests', () => {
  it('Can create a User Store.', () => {
    const store = UserStore.create({});

    expect(store).toBeDefined();
  });
});

describe('User Settings Model Tests', () => {
  it('Can create a User Settings Object.', () => {
    const settings = UserSettings.create({});

    expect(settings).toBeDefined();
    expect(settings.theme).toBe('Light');
  });
});
