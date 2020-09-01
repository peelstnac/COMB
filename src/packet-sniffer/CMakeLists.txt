cmake_minimum_required(VERSION 3.10)
project(packet-sniffer)

set(CMAKE_C_STANDARD 99)
set(THREADS_PREFER_PTHREAD_FLAG ON)
find_package(Threads REQUIRED)

include_directories(include)

add_executable(packet-sniffer main.c start.c handle_ethhdr.c handle_ip.c handle_tcp.c update.c helper_functions.c)
target_link_libraries(packet-sniffer PRIVATE Threads::Threads)