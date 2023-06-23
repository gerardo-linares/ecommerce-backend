import bcrypt from "bcrypt";

export const createHash = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const validatePassword = async (password, hashedPassword) => {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
};
