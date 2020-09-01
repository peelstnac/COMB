#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <unistd.h>

// TCP connection
void update_send(char *cpy)
{
    // TODO rework the error handling
    int sockfd;
    struct addrinfo hints, *res;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    if (getaddrinfo("localhost", "6000", &hints, &res) != 0)
    {
        perror("getaddrinfo failed");
    }
    if ((sockfd = socket(res->ai_family, res->ai_socktype, 0)) < 0)
    {
        perror("Failed to initialize socket");
    }
    if (connect(sockfd, res->ai_addr, res->ai_addrlen) != 0)
    {
        perror("Failed to connect.");
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
    printf("\n \n \n UPDATE %s \n \n \n", cpy);
    update_send(cpy);
    free(cpy);
    pthread_exit(NULL);
}
