// -*- coding: utf-8, tab-width: 2 -*-

const spaces = '                                ';

function spacesPad(b, x, a) {
  let y = String(x);
  let d = b - y.length;
  if (d > 0) { y = spaces.slice(0, d) + y; }
  d = a - y.length;
  if (d > 0) { y += spaces.slice(0, d); }
  return y;
}

export default spacesPad;
