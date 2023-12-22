#import "QuickUtf8.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>

@implementation QuickUtf8
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
    NSLog(@"Initializing QuickUtf8 module...");

    RCTBridge *bridge = [RCTBridge currentBridge];
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)bridge;
    if (cxxBridge == nil) {
        return @false;
    }

    auto jsiRuntime = (facebook::jsi::Runtime *)cxxBridge.runtime;
    if (jsiRuntime == nil) {
        return @false;
    }
    auto &runtime = *jsiRuntime;

    quickutf8::installModule(runtime);
    return @true;
}
@end
