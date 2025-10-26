import argon2 from "argon2";

const auth = {
  async  hashPassword(plain: string) {
    return argon2.hash(plain, {
      type: argon2.argon2id
    });
  },


  async verifyPassword(hash: string, plain: string) {
    try {
      console.log(hash, plain);
      return await argon2.verify(hash, plain);

    } catch {
      return false;
    
    }
  }
}

module.exports = auth;
