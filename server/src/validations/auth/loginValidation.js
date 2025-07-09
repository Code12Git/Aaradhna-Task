const z = require('zod')

const loginValidation = z.object({
  email: z.string().email('Invalid email format').trim(),

  password: z.string().trim().min(6, 'Password must be at least 6 characters long'),
});

module.exports = loginValidation
