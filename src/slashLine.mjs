// -*- coding: utf-8, tab-width: 2 -*-

import fail from './fail';
import findStartAndSize from './findStartAndSize';
import spacePad from './spacePad';
import sizeUnits from './sizeUnits';

const colWidth = (+process.env.PTBL_COLWIDTH || 10);
const endNumRgx = /\d*$/;

function slashLine(ctx) {
  const { prevPrtnNum, topic } = ctx;
  const ptnNum = +endNumRgx.exec(topic);
  if (!ptnNum) { return fail(ctx, 'Expected a trailing partition number'); }
  const numPlus = ptnNum - prevPrtnNum;
  if (numPlus < 1) {
    return fail(ctx, 'Unexpected partition number ' + ptnNum
      + ' after ' + prevPrtnNum + ', order must be ascending!');
  }
  const loca = findStartAndSize(ctx);
  const { gap, size, details } = loca;
  const posiType = (gap < 0 ? 'start' : 'gap');
  ctx.upd({ prevPrtnNum: ptnNum });
  ctx.say('+' + spacePad(0, `${numPlus}`, 3) + ' : ' + posiType + '= '
    + spacePad(colWidth - posiType.length,
      sizeUnits.humanizeSum(loca[posiType]), 0)
    + ', size= ' + spacePad(colWidth, sizeUnits.humanizeSum(size), 0)
    + ', ' + details);
}

export default slashLine;
