#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int update(char* store) {
    char* cpy = malloc(50000);
    strcpy(cpy, store);
    memset(store, 0, sizeof(store));
    printf("\n \n \n UPDATE %s \n \n \n", cpy);
    free(cpy);
}