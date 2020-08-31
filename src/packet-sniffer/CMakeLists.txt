cmake_minimum_required(VERSION 3.10)
project(packet-sniffer)

set(CMAKE_C_STANDARD 99)

include_directories(include)
add_executable(packet-sniffer main.c start.c handle_ethhdr.c handle_ip.c handle_tcp.c update.c helper_functions.c)
