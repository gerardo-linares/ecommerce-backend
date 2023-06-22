import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (password, hashedPassword) => {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
};