import bcrypt from 'bcrypt';


// **** Functions **** //

/**
 * Get a hash from the password.
 */
function getHash(pwd: string, salt?: string): Promise<string> {
  if (salt === undefined) {
    salt = bcrypt.genSaltSync();
  }
  return bcrypt.hash(pwd, salt);
}

/**
 * Useful for testing.
 */
function hashSync(pwd: string, salt?: string): string {
  if (salt === undefined) {
    salt = bcrypt.genSaltSync();
  }
  return bcrypt.hashSync(pwd, salt);
}

/**
 * See if a password passes the hash.
 */
function compare(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}


// **** Export Default **** //

export default {
  getHash,
  hashSync,
  compare,
} as const;
