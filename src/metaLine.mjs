// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';
import sizeUnits from './sizeUnits';

const { hrSumFmtName } = sizeUnits;

function metaLine(ctx) {
  if (ctx.prevPrtnNum !== 0) { return fail(ctx, 'Meta line after partition'); }
  const { meta, topic, colonData: orig } = ctx;
  if (!topic) { return fail(ctx, 'Empty meta key'); }
  if (!orig) { return fail(ctx, 'Empty meta value'); }
  if (meta[topic]) { return fail(ctx, 'Duplicate meta key'); }
  meta[topic] = orig;
  if (topic === 'unit') {
    if (orig === 'sectors') { return ctx.say(topic + ': ' + hrSumFmtName); }
    if (orig === hrSumFmtName) { return ctx.say(topic + ': sectors'); }
    return fail(ctx, 'Unsupported input unit');
  }
  return ctx.say(ctx.curLnOrig);
}

export default metaLine;
