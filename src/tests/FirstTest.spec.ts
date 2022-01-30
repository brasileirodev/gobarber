import { User } from '@models/User';

test('it should be ok', () => {
  const user = new User('marcel', 'brasileiro@gmail.com');
  expect(user.name).toBe('marcel');
  expect(user.email).toBe('brasileiro@gmail.com');
});
