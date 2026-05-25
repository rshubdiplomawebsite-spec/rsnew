import jwt from "jsonwebtoken";

async function CheckAuth(token) {
  const decodedData = jwt.verify(token, process.env.JWT_SEC);

  const user = decodedData.user;

  return user;
}

export default CheckAuth;
