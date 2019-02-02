
<!--#echo json="package.json" key="name" underline="=" -->
relativize-sfdisk-dump-pmb
==========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
In a partition list from `sfdisk --dump`, translate between absolute and
relative partition numbers and offsets. Also translate sizes between sectors
and human-friendly suffixed bytes.
<!--/#echo -->



API
---

This module exports one function:

### relativize(input)

`input` can be an array that contains the dump's lines,
or just a string, in which case it will be split into lines.

Returns an array of translated dump lines.

Translation works both ways, selected based on the `unit:` header line.
See [the tests](test/) for examples.



Usage
-----

In JavaScript: see [bin/cli.mjs](bin/cli.mjs)

In your shell:

```bash
LANG=C sfdisk --dump /dev/sda | relativize-sfdisk-dump-pmb >ptable.txt
"$EDITOR" ptable.txt
relativize-sfdisk-dump-pmb ptable.txt >sfdisk-script.txt
sfdisk -O /remote/backup/sda.bak /dev/sda <sfdisk-script.txt
```



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
