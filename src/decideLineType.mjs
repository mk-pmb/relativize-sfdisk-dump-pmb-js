// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';
import metaLine from './metaLine';
import slashLine from './slashLine';
import plusLine from './plusLine';

const colonLineRgx = /^(\/|\+|)(\S+)\s*:\s/;

function decideLineType(ctx) {
  const ln = ctx.curLnOrig.trim();
  if (!ln) { return ctx.say(''); }

  const colonMatch = colonLineRgx.exec(ln);
  if (!colonMatch) { return fail.unsupp(ctx); }
  const lnType = colonMatch[1];
  ctx.upd({
    topic: colonMatch[2],
    colonData: ln.slice(colonMatch[0].length).trim(),
  });

  if (!lnType) { return metaLine(ctx); }
  if (lnType === '/') { return slashLine(ctx); }
  if (lnType === '+') { return plusLine(ctx); }

  return fail.unsupp(ctx);
}

export default decideLineType;
