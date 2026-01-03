import bcrypt from "bcrypt";

const newPassword = "Admin2NewStrongPassword!";
const hash = await bcrypt.hash(newPassword, 10);

console.log(hash);
