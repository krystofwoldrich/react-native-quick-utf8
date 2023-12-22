#include "react-native-quick-utf8.h"

using namespace facebook;

struct MutableStringBuffer : jsi::MutableBuffer {
  MutableStringBuffer(std::string s) : _s(std::move(s)) {}

  size_t size() const override {
    return _s.length();
  }
  uint8_t *data() override {
    return reinterpret_cast<uint8_t *>(_s.data());
  }

  std::string _s;
};

namespace quickutf8 {
  std::string stringToUtf8BytesFunctionName = "stringToUtf8Bytes";
  std::string utf8BytesToStringFunctionName = "utf8BytesToString";

  void installModule(jsi::Runtime& runtime) {
    auto stringToUTF8Bytes = createStringToUtf8Bytes(runtime);
    auto UTF8BytesToString = createUtf8BytesToString(runtime);

    // TODO: Create global module object which holds the functions

    runtime.global().setProperty(runtime, stringToUtf8BytesFunctionName.c_str(), std::move(stringToUTF8Bytes));
    runtime.global().setProperty(runtime, utf8BytesToStringFunctionName.c_str(), std::move(UTF8BytesToString));
  }

  jsi::Function createStringToUtf8Bytes(jsi::Runtime& runtime) {
    return jsi::Function::createFromHostFunction(
      runtime,
      jsi::PropNameID::forAscii(runtime, stringToUtf8BytesFunctionName.c_str()),
      1,
      [](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) -> jsi::Value {
          if (!arguments[0].isString()) {
              throw jsi::JSError(runtime, "Expected the first and only argument to be a String.");
          }

          std::string s = arguments[0].asString(runtime).utf8(runtime);
          std::shared_ptr<MutableStringBuffer> shared = std::make_shared<MutableStringBuffer>(s);
          return jsi::Value(jsi::ArrayBuffer(runtime, std::move(shared)));
      }
    );
  }

  jsi::Function createUtf8BytesToString(jsi::Runtime& runtime) {
    return jsi::Function::createFromHostFunction(
      runtime,
      jsi::PropNameID::forAscii(runtime, utf8BytesToStringFunctionName.c_str()),
      1,
      [](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) -> jsi::Value {
          if (!arguments[0].isObject() && !arguments[0].asObject(runtime).isArrayBuffer(runtime)) {
              throw jsi::JSError(runtime, "Expected the first and only argument to be a ArrayBuffer.");
          }

          jsi::ArrayBuffer arrayBuffer = arguments[0].asObject(runtime).getArrayBuffer(runtime);
          return jsi::Value(jsi::String::createFromUtf8(runtime, arrayBuffer.data(runtime), arrayBuffer.size(runtime)));
      }
    );
  }
}
