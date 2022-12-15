import * as bcrypt from 'bcrypt';

export async function hashPassword(passwordInPlaintext: string) {
  const hashedPassword = await bcrypt.hash(passwordInPlaintext, 10);
  return hashedPassword;
}

export async function verifyPassword(
  passwordInPlaintext: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(passwordInPlaintext, hashedPassword);
}
