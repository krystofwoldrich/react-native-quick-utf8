#ifndef QUICKUTF8_H
#define QUICKUTF8_H

#include <jsi/jsilib.h>
#include <jsi/jsi.h>

namespace quickutf8 {
  using namespace facebook;

  void installModule(jsi::Runtime& jsiRuntime);
  jsi::Function createStringToUtf8Bytes(jsi::Runtime& runtime);
  jsi::Function createUtf8BytesToString(jsi::Runtime& runtime);
}

#endif /* QUICKUTF8_H */
