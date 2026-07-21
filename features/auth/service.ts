import { authRepository } from "./repository";
import { hashPassword } from "./password";
import { registerSchema, RegisterInput } from "./validation";

export async function registerCustomer(input: RegisterInput) {
  const data = registerSchema.parse(input);

  const existing = await authRepository.findByEmail(data.email);

  if (existing) {
    throw new Error("Customer already exists.");
  }

  const passwordHash = await hashPassword(data.password);

  return authRepository.createCustomer({
    email: data.email,
    passwordHash,
    firstName: data.firstName,
    lastName: data.lastName,
    status: "PENDING",
  });
}

export async function loginCustomer(input: { email: string; password: string }) {
  const customer = await authRepository.findByEmail(input.email);

  if (!customer || !customer.passwordHash) {
    throw new Error("Invalid credentials.");
  }

  const valid = await import("./password").then(({ verifyPassword }) =>
    verifyPassword(input.password, customer.passwordHash!),
  );

  if (!valid) {
    throw new Error("Invalid credentials.");
  }

  await authRepository.updateLastLogin(customer.id);

  return customer;
}
