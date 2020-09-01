#include <stdio.h>

void start(int *c_code)
{
// Scan in the connection code
// TODO: prompt for promiscuous mode option
#ifndef NDEBUG
    // Check for not debug flag
    printf("NOTE: currently in DEBUG mode.\n");
#endif
    printf("START: please enter your connection code: ");
    scanf("%d", c_code);
}