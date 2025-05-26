import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DecryptionService {
  private encryptionKey = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
  private iv = '3ad77bb40d7a3660a89ecaf32466ef97';

  encrypt(text: any): string {
    const key = CryptoJS.enc.Hex.parse(this.encryptionKey);
    const iv = CryptoJS.enc.Hex.parse(this.iv);

    const dataToEncrypt = typeof text === 'string' ? text : JSON.stringify(text);

    const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return `${this.iv}:${encrypted.toString()}`;
  }

  decrypt(text: string) {
    try {
      const [iv, encrypted] = text.split(':');
      const key = CryptoJS.enc.Hex.parse(this.encryptionKey);
      const ivHex = CryptoJS.enc.Hex.parse(iv);
      const encryptedBase64 = CryptoJS.enc.Base64.parse(encrypted);

      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBase64 } as any,
        key,
        { iv: ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return '';
    }
  }
}

