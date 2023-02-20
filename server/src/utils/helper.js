import jwt from "jsonwebtoken";
export function generateJWT(user) {
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token;
}
export function decodeJWT(token) {
  try {
    const ob = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);

    return ob;
  } catch (error) {
    return false;
  }
}
