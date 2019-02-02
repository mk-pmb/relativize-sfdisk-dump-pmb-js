// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';
import findStartAndSize from './findStartAndSize';
import spacePad from './spacePad';
import sizeUnits from './sizeUnits';

function sectCol(ctx, n) {
  return spacePad(12, sizeUnits.toSectors(ctx, n), 0);
}

function plusLine(ctx) {
  const { prevPrtnNum, topic } = ctx;
  const numPlus = (+topic || 0);
  if (numPlus < 1) { return fail(ctx, 'Partition numbers must increase'); }
  const ptnNum = prevPrtnNum + numPlus;
  const loca = findStartAndSize(ctx);
  const { start, size, details } = loca;
  ctx.upd({ prevPrtnNum: ptnNum });
  ctx.say(String(ctx.meta.device || '') + ptnNum
    + ' : start=' + sectCol(ctx, start)
    + ', size=' + sectCol(ctx, size)
    + ', ' + details);
}

export default plusLine;
