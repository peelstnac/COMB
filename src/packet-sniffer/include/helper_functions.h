#ifndef PACKET_SNIFFER_HELPER_FUNCTIONS_H
#define PACKET_SNIFFER_HELPER_FUNCTIONS_H
#include <stdio.h>
// Creates a new file with path src
void new_file(FILE **file, char src[50]);
// Generic error message
void handle_err();

#endif