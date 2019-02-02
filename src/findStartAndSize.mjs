// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';
import findSectorSize from './findSectorSize';
import sizeUnits from './sizeUnits';

const lengthPropRgx = ' = (\\d[\\w\\s\\+\\-]*) , '.replace(/ /g, '\\s*');
const startSizeRgx = new RegExp('^(start|gap)' + lengthPropRgx
  + 'size' + lengthPropRgx);

function findStartGap(ctx, t, b, o) {
  if (t === 'start') { return { start: b, gap: b - o }; }
  if (t === 'gap') { return { start: o + b, gap: b }; }
  return fail.unsupp(ctx);
}

function findStartAndSize(ctx) {
  const { colonData, diskOffset } = ctx;
  if (!ctx.sectorSize) { findSectorSize(ctx); }
  const matched = startSizeRgx.exec(colonData);
  if (!matched) { return fail.unsupp(ctx); }
  const [eaten, posiType, posiSpec, sizeSpec] = matched;
  const posiBytes = sizeUnits.toBytes(ctx, posiSpec);
  const info = findStartGap(ctx, posiType, posiBytes, diskOffset);
  info.size = sizeUnits.toBytes(ctx, sizeSpec);
  info.details = colonData.slice(eaten.length);
  ctx.upd({ diskOffset: info.start + info.size });
  return info;
}

export default findStartAndSize;
