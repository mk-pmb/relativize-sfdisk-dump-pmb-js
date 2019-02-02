// -*- coding: utf-8, tab-width: 2 -*-

import decideLineType from './decideLineType';

function asLines(x) {
  if (Array.isArray(x)) { return x; }
  return String(x).split(/\n/);
}

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
  asLines(origDump).forEach(parseInputLine);
  return output;
}

export default translate;
