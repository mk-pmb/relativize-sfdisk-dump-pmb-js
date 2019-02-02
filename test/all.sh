#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function test_all () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH" || return $?

  local BFN= DIFF= SXS=0 ERR=0
  for BFN in *.dump.txt; do
    BFN="${BFN%.dump.txt}"
    transdiff "$BFN" dump hrsum
    transdiff "$BFN" hrsum dump
  done

  echo "$SXS passed, $ERR errors"
  [ "$SXS" -ge 1 ] || return 2$(echo "E: tested nothing" >&2)
  return "$ERR"
}


function transdiff () {
  local BFN="$1"; shift
  local ORIG="$1"; shift
  local DIFF="$BFN.$ORIG.diff"
  ORIG="$BFN.$ORIG.txt"
  local WANT="$BFN.$1.txt"; shift
  diff -sU 9002 --label {,}"$WANT" \
    --label "translated $ORIG" <(
    SECTOR_SIZE=512 ../bin/cli.mjs "$ORIG"
    ) | tee -- "$DIFF"
  if [ "${PIPESTATUS[*]}" == '0 0' ]; then
    rm -- "$DIFF" || return $?
    let SXS="$SXS+1"
  else
    let ERR="$ERR+1"
  fi
}









[ "$1" == --lib ] && return 0; test_all "$@"; exit $?
