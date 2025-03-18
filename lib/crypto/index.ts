export * from "./encoding";

const secret = process.env.AUTH_VALUE as string;

/*
 * Encrypts a string using a salt
 * @param string - The string to encrypt
 * @param salt - The salt used for encryption
 * @returns The encrypted string
 */
export async function getHash(string: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToBase64(hashBuffer);
}

/*
 * Encrypts a string using a salt
 * @param string - The string to encrypt
 * @param salt - The salt used for encryption
 * @returns The encrypted string
 */
export async function getHmac(string: string, salt = secret) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const secretData = encoder.encode(salt);

  const key = await crypto.subtle.importKey(
    "raw",
    secretData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, data);
  return bufferToBase64(signature);
}

// Helper function to convert ArrayBuffer to base64 string
export function bufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper function to generate a UUID
export function generateUUID() {
  // Get 16 random bytes (128 bits)
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  // Set the version (4) and variant (RFC4122)
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // version 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // variant RFC4122

  // Convert to hex string with proper formatting
  const hex = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Format as UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20, 32),
  ].join("-");
}

/*
 * Generates a random verification code
 * @param digits - The number of digits in the code (default: 6)
 * @returns The verification code
 */
export function generateVerificationCode(digits = 6) {
  const code = Math.floor(Math.random() * 10 ** digits);

  return code.toString().padStart(digits, "0");
}
