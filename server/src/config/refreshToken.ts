import jwt from "jsonwebtoken";

const generateRefreshToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET || "supersecret";
  return jwt.sign({ id }, jwtSecret, { expiresIn: "3d" });
};

export default generateRefreshToken;
