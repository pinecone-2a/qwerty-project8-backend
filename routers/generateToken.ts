import jwt from "jsonwebtoken";
export const generateAccessToken = (userId: number) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h",
    });
  
    return token;
  };