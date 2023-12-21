cmake_minimum_required(VERSION 3.4.1)
project(QuickUtf8)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(react-native-quick-utf8            SHARED
            ../cpp/react-native-quick-utf8.cpp
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp
)
