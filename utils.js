import { fileURLToPath } from "url";
import { dirname } from "path";

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authToken"];
    console.log(token);
  }
  return token;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

export const generateUniqueCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 8;
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};
