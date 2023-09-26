import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET || "supersecret";
  return jwt.sign({ id }, jwtSecret, { expiresIn: "1d" });
};


export default generateToken;