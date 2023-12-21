#include <jni.h>
#include "react-native-quick-utf8.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_quickutf8_QuickUtf8Module_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return quickutf8::multiply(a, b);
}
