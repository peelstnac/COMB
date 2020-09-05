#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <unistd.h>
#include "main.h"
#include "helper_functions.h"

// TCP connection
void update_send(char *cpy)
{
    printf("%d", c_code);
    int sockfd;
    struct addrinfo hints, *res;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    int gret, cret;
    if ((gret = getaddrinfo("localhost", "5000", &hints, &res)) != 0)
    {
        fprintf(fp_err, "update.c: getaddrinfo() failed, returned %d\n", gret);
        handle_err();
    }
    if ((sockfd = socket(res->ai_family, res->ai_socktype, 0)) < 0)
    {
        fprintf(fp_err, "update.c: socket() failed, returned %d\n", sockfd);
        handle_err();
    }
    if ((cret = connect(sockfd, res->ai_addr, res->ai_addrlen)) != 0)
    {
        fprintf(fp_err, "update.c: connect() failed, returned %d\n", cret);
        handle_err();
    }
    // Send the data
    write(sockfd, cpy, 50000);
    close(sockfd);
}

void *update(void *store)
{
    char *cpy = malloc(50000);
    strcpy(cpy, (char *)store);
    memset((char *)store, 0, sizeof(store));
#ifndef NDEBUG
    printf("\n \n \n UPDATE %s \n \n \n", cpy);
#endif
    update_send(cpy);
    free(cpy);
    pthread_exit(NULL);
}
