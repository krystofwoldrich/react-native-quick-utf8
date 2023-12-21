#ifdef __cplusplus
#import "react-native-quick-utf8.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNQuickUtf8Spec.h"

@interface QuickUtf8 : NSObject <NativeQuickUtf8Spec>
#else
#import <React/RCTBridgeModule.h>

@interface QuickUtf8 : NSObject <RCTBridgeModule>
#endif

@end
