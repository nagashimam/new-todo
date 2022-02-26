import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class HashService {
  private readonly solt = 'dimyristoylphosphatidylcholine';
  private readonly streachCount = 1000;
  private readonly hashAlgorithm = 'sha256';

  public hash(original: string, count = 0): string {
    if (count === this.streachCount) {
      return original;
    } else {
      const hash = createHash(this.hashAlgorithm);
      hash.update(`${this.solt}${original}`);
      return this.hash(hash.digest('hex'), count + 1);
    }
  }
}
