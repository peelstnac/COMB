#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

void *update(void *store)
{
    char *cpy = malloc(50000);
    strcpy(cpy, (char *)store);
    memset((char *)store, 0, sizeof(store));
    printf("\n \n \n UPDATE %s \n \n \n", cpy);
    free(cpy);
    pthread_exit(NULL);
}