import bcrypt from "bcrypt";

export async function encrypt(password: string) {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
}

// password from input body, hashedPassword from db
export async function decrypt(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
