cmake_minimum_required(VERSION 3.7...3.18)

if(${CMAKE_VERSION} VERSION_LESS 3.12)
    cmake_policy(VERSION ${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION})
endif()

project(packet-sniffer DESCRIPTION "Packet sniffing made easy" LANGUAGES C)

set(CMAKE_C_STANDARD 99)
set(THREADS_PREFER_PTHREAD_FLAG ON)
set(CMAKE_C_FLAGS_RELEASE_INIT "-DNDEBUG")

find_package(Threads REQUIRED)

include_directories(include)
add_executable(packet-sniffer main.c start.c handle_ethhdr.c handle_ip.c handle_tcp.c update.c helper_functions.c)

target_link_libraries(packet-sniffer PRIVATE Threads::Threads)