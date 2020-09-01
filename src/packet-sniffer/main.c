// TODO add preprocessor directives for windows includes
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip.h> /* superset of previous */
#include <netinet/tcp.h>
#include <net/ethernet.h> /* the L2 protocols */
#include <arpa/inet.h>
// TODO add asserts and unit tests
// User defined header files
#include "start.h"
#include "helper_functions.h"
#include "handle_ethhdr.h"
#include "handle_ip.h"
#include "handle_tcp.h"
// Enable booleans
typedef enum {false, true} bool;

// Define counters
static int update_count = 0;
// Once count reaches max_count, the store will be cleared
static int max_count = 50;

int main(int argc, char* argv[]) {
    // Define the connection code
    int c_code;
    start(&c_code);
    // Initialize store buffer
    char* store = malloc(50000);
    // Create a new file called error_log.txt
    FILE* fp_err;
    new_file(&fp_err, "build/error_log.txt");
    // Start sniffing with a raw_socket
    int sock_raw;
    if ((sock_raw = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL))) < 0) {
        fprintf(fp_err, "main.c: sock_raw failed to initialize, returned %d\n", sock_raw);
        handle_err();
        return 1;
    }
    // Define a stop flag
    // TODO create a key listener to trigger the stop flag
    bool flag = false;
    // Initialize a buffer and variable that stores buffer size
    char* buf = malloc(50000);
    size_t len = 50000;
    // Initialize recvfrom variables
    int flags = 0;
    struct sockaddr from;
    socklen_t fromlen = sizeof(from);
    // Protocol handler array
    void (*handler[1<<8])(char* store, int);
    // Keep listening until flag is triggered
    for (;;) {
        if (flag) {
            close(sock_raw);
            free(buf);
            break;
        }
        // Variable to store length of data received
        int r_len;
        if ((r_len = recvfrom(sock_raw, buf, len, flags, &from, &fromlen)) < 0) {
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
        struct ip* iph_ptr = (struct ip*)(buf + sizeof(struct ethhdr));
        int ip_proto = iph_ptr->ip_p;
        // Array of pointers to functions which handle each protocol
        // https://en.wikipedia.org/wiki/List_of_IP_protocol_numbers

        for (int i=0; i<(1<<8); i++) handler[i] = NULL;
        // Load the handler functions
        handler[6] = handle_tcp;

        if (handler[ip_proto] == NULL) {
            // Print unhandled warning if debug mode
            #ifndef NDEBUG
                printf("\n\nUnhandled IP Protocol Number: %d\n\n", ip_proto);
            #endif
            continue;
        }

        // Start handing
        handle_ethhdr(store, r_len);
        handle_ip(store, r_len);
        handler[ip_proto](store, r_len);
    }
    return 0;
}