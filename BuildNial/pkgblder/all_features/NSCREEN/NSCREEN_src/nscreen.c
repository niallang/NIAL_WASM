/*==============================================================

  MODULE   NSCREEN.C

  COPYRIGHT NIAL Systems Limited  1983-2016

  Simple screen manipulation functions

================================================================*/


/* Q'Nial file that selects features */

#include "switches.h"

/* standard library header files */

/* IOLIB */
#include <stdio.h>
#include <sys/stat.h>
#include <errno.h>
#include <unistd.h>
#ifdef UNIXSYS
#include <sys/mman.h>
#endif
#include <sys/fcntl.h>

/* LIMITLIB */
#include <limits.h>

/* STDLIB */
#include <stdlib.h>

/* SJLIB */
#include <setjmp.h>

/* Q'Nial header files */

#include "qniallim.h"
#include "lib_main.h"
#include "absmach.h"
#include "basics.h"
#include "compare.h"
#include "sorts.h"
#include "trs.h"             /* for int_each etc. */
#include "utils.h"           /* for converters */
#include "faults.h"          /* for logical fault */
#include "logicops.h"        /* for orbools and andbools */
#include "ops.h"             /* for simple and splifb */

#ifdef EMSCRIPTEN
#include <emscripten.h>
#endif

#ifdef NSCREEN


void iclearscreen() {
  nialptr x = apop();

#ifdef EMSCRIPTEN
#define __CLRSCRN_FOUND__

  EM_ASM(
	 clearNialOutput();
	 );
  apush(True_val);
#endif

#ifndef __CLRSCRN_FOUND__
  apush(False_val);
#endif
  
  freeup(x);
  return;
}


#endif /* NSCREEN */
