// TODO add preprocessor directives for windows includes
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include <net/ethernet.h>
#include <arpa/inet.h>
#include <pthread.h>
// TODO add asserts and unit tests
// User defined header files
#include "start.h"
#include "helper_functions.h"
#include "handle_ethhdr.h"
#include "handle_ip.h"
#include "handle_tcp.h"
#include "update.h"

// Enable booleans
typedef enum
{
    false,
    true
} bool;

// Define counters
static int update_count = 0;
// Once count reaches max_count, the store will be cleared

#ifndef NDEBUG
static int max_count = 10;
#else
static int max_count = 50;
#endif

// Define the connection code
int c_code;

int main(int argc, char *argv[])
{

    start(&c_code);
    // Initialize store buffer
    char *store = malloc(50000);
    // Create a new file called error_log.txt
    FILE *fp_err;
    new_file(&fp_err, "build/error_log.txt");
    // Start sniffing with a raw_socket
    int sock_raw;
    if ((sock_raw = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL))) < 0)
    {
        fprintf(fp_err, "main.c: sock_raw failed to initialize, returned %d\n", sock_raw);
        handle_err();
        return 1;
    }
    // Define a stop flag
    // TODO create a key listener to trigger the stop flag
    bool flag = false;
    // Initialize a buffer and variable that stores buffer size
    char *buf = malloc(50000);
    size_t len = 50000;
    // Initialize recvfrom variables
    int flags = 0;
    struct sockaddr from;
    socklen_t fromlen = sizeof(from);
    // Protocol handler array
    void (*handler[1 << 8])(char *, char *, int);
    // Keep listening until flag is triggered
    for (;;)
    {
        if (flag)
        {
            close(sock_raw);
            free(buf);
            break;
        }
        // Variable to store length of data received
        int r_len;
        if ((r_len = recvfrom(sock_raw, buf, len, flags, &from, &fromlen)) < 0)
        {
            fprintf(fp_err, "main.c: recvfrom sock_raw failed, returned %d\n", r_len);
            handle_err();
            return 1;
        }
        /*
         * Headers in order
         * 1. Ethernet
         * 2. IP
         * 3. Protocol
         */
        // Strip the IP header to get protocol type
        struct ip *iph_ptr = (struct ip *)(buf + sizeof(struct ethhdr));
        int ip_proto = iph_ptr->ip_p;
        // Array of pointers to functions which handle each protocol
        // https://en.wikipedia.org/wiki/List_of_IP_protocol_numbers

        for (int i = 0; i < (1 << 8); i++)
            handler[i] = NULL;
        // Load the handler functions
        handler[6] = handle_tcp;

        if (handler[ip_proto] == NULL)
        {
#ifndef NDEBUG
            // printf("\n\nUnhandled IP Protocol Number: %d\n\n", ip_proto);
#endif
            continue;
        }

        // Start handing
        // Check for localhost loop when in development
#ifndef NODEBUG
        if (handle_ethhdr(store, buf, r_len) == 2)
        {
            continue;
        }
#else
        handle_ethhdr(store, buf, r_len);
#endif
        handle_ip(store, buf, r_len);
        handler[ip_proto](store, buf, r_len);
        // Update condition
        update_count++;
        if (update_count >= max_count)
        {
            // Create a thread
            pthread_t thread;
            pthread_create(&thread, NULL, update, (void *)store);
            update_count = 0;
        }
    }
    return 0;
}