// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';

function solved(ctx, x) {
  const n = (+x || 0);
  if (n > 0) {
    ctx.upd({ sectorSize: n });
    return true;
  }
  return false;
}

function findSectorSize(ctx) {
  if ((+ctx.sectorSize || 0) > 0) { return; }

  const envOverride = +process.env.SECTOR_SIZE;
  if (solved(ctx, envOverride)) { return; }

  const { meta } = ctx;
  const trivial = (+meta['bytes-per-sector']
    || meta['logical-sector-size']);
    // ^-- My sfdisks won't print these. Would have been too easy, right?
  if (solved(ctx, trivial)) { return; }

  return fail(ctx, 'Cannot detect the sector size.'
    + ' Please set environment variable SECTOR_SIZE'
    + ' to a positive number (of bytes per sector).');
}

export default findSectorSize;
