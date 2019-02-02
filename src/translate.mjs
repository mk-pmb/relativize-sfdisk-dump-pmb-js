// -*- coding: utf-8, tab-width: 2 -*-

import decideLineType from './decideLineType';

function translate(origDump) {
  const output = [];
  const ctx = {
    curLnNum: null,
    curLnOrig: null,
    meta: {},
    prevPrtnNum: 0,
    diskOffset: 0,
    say(ln) { output.push(ln); },
    upd(u) { Object.assign(ctx, u); },
  };
  function parseInputLine(ln, idx) {
    ctx.curLnOrig = ln;
    ctx.curLnNum = idx + 1;
    decideLineType(ctx);
  }
  String(origDump).split(/\n/).forEach(parseInputLine);
  return output;
}

export default translate;
