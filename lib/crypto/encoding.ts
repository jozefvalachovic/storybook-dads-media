import { bufferToBase64 } from ".";

const secret = process.env.AUTH_SECRET as string;

/**
 * Encrypts a string to base64 using a salt
 * @param plaintext - The string to encrypt
 * @param salt - The salt to use for encryption (default: auth secret)
 * @returns Base64 encoded encrypted string
 */
export async function encodeString(plaintext: string, salt = secret): Promise<string> {
  // Convert input to encoding
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // Generate a key from the salt
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(salt),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  // Generate an encryption key using PBKDF2
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("static-salt-for-consistency"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  // Generate a random IV (initialization vector)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);

  // Combine IV and encrypted data
  const result = new Uint8Array(iv.length + encrypted.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encrypted), iv.length);

  // Return as base64
  return bufferToBase64(result.buffer);
}

/**
 * Decrypts a base64 encoded string using a salt
 * @param encoded - The base64 encoded string to decrypt
 * @param salt - The salt used for encryption (default: auth secret)
 * @returns The decrypted string
 */
export async function decodeString(encoded: string, salt = secret): Promise<string> {
  try {
    // Convert base64 to binary
    const binaryData = base64ToBuffer(encoded);

    // Extract IV and encrypted data
    const iv = binaryData.slice(0, 12);
    const encryptedData = binaryData.slice(12);

    // Generate the key from the salt
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(salt),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    // Generate an encryption key using PBKDF2
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("static-salt-for-consistency"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedData);

    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decode string with provided salt");
  }
}

// Helper function to convert base64 to ArrayBuffer
function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
