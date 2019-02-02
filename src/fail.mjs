// -*- coding: utf-8, tab-width: 2 -*-

function fail(ctx, why) {
  const err = new Error(why
    + ' @ line ' + ctx.curLnNum
    + ' ' + JSON.stringify(ctx.curLnOrig));
  throw err;
}

Object.assign(fail, {

  unsupp(ctx) { fail(ctx, 'Unsupported input line'); },

});

export default fail;
