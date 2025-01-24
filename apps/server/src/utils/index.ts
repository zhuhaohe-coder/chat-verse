import * as crypto from 'crypto';

export function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}

export function generateRandomCode(length: number): string {
  if (length <= 0) {
    throw new Error('长度必须大于0');
  }

  const min = Math.pow(10, length - 1); // 最小值，例如长度为4时是1000
  const max = Math.pow(10, length) - 1; // 最大值，例如长度为4时是9999

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
}
