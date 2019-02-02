// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';

const prefixLetters = 'KMGTP'.match(/\S/g);
// Naming note: We use the prefixes to the base unit (byte)
//    as suffixes to the numbers of bytes.

const prefixStepFactor = 1024;
const hrSumFmtName = 'human-readable-byte-sums';

const su = {
  prefixLetters,
  prefixStepFactor,
  hrSumFmtName,
};

(function addUnits() {
  let n = 1;
  prefixLetters.forEach(function escalate(p) {
    n *= prefixStepFactor;
    su[p] = n;
  });
}());

const sizeSpecIgnoresRgx = /[\s_]+/g;
const simpleNatNumRgx = /^\d+$/;
const hrSumFirstRgx = /^(\+|\-|)(\d+)([a-z]?)/i;

Object.assign(su, {

  toBytes(ctx, spec) {
    const { sectorSize } = ctx;
    if (!sectorSize) { fail(ctx, 'sectorSize not set'); }
    const cleanSpec = spec.replace(sizeSpecIgnoresRgx, '');
    const metaUnit = ctx.meta.unit;
    if (metaUnit === 'sectors') {
      const n = (simpleNatNumRgx.exec(cleanSpec) || false)[0];
      if (n === cleanSpec) { return (+n || 0) * sectorSize; }
      fail(ctx, 'Unsupported number format for unit "sectors"');
    }
    if (metaUnit === hrSumFmtName) {
      let remain = cleanSpec;
      let bytes = 0;
      while (remain) {
        const m = hrSumFirstRgx.exec(remain);
        if (!m) { break; }
        const [eaten, sign, num, unit] = m;
        const f = (unit ? su[unit] : 1);
        if (!f) { fail(ctx, 'Unsupported size unit: ' + unit); }
        bytes += (sign === '-' ? -1 : 1) * (+num || 0) * f;
        remain = remain.slice(eaten.length);
      }
      if (remain) { fail(ctx, 'Unsupported remaining size spec: ' + remain); }
      return bytes;
    }
    return fail(ctx, 'Unsupported meta unit');
  },

  toSectors(ctx, bytes) {
    const { sectorSize } = ctx;
    if (!sectorSize) { fail(ctx, 'sectorSize not set'); }
    const r = bytes % sectorSize;
    if (r) { ctx.fail(ctx, 'Size not divisible by sector size: ' + bytes); }
    return bytes / sectorSize;
  },

  humanizeExact(bytes) {
    let u = '';
    let n = bytes;
    prefixLetters.every(function canGoBigger(p) {
      const r = n % prefixStepFactor;
      if (r !== 0) { return false; }
      n /= prefixStepFactor;
      u = p;
      return true;
    });
    return n.toFixed(0) + u;
  },

  humanizeSum(bytes) {
    if (!bytes) { return '0'; }
    const sum = [];
    let n = bytes;
    function chop(unit) {
      const r = n % prefixStepFactor;
      if (r) { sum.push(r + unit); }
      n = (n - r) / prefixStepFactor;
      return n;
    }
    chop('');
    prefixLetters.every(chop);
    return sum.reverse().join('+');
  },

});











export default su;
