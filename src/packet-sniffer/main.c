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
// Enable booleans
typedef enum {false, true} bool;

int main(int argc, char* argv[]) {
    // Define the connection code
    int c_code;
    start(&c_code);
    // Create a new file called error_log.txt
    FILE* fp_err;
    new_file(&fp_err, "build/error_log.txt");
    // Start sniffing with a raw_socket
    int sock_raw;
    if (sock_raw = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL)) < 0) {
        fprintf(fp_err, "main.c/27: sock_raw failed to initialize, returned %d\n", sock_raw);
        handle_err();
        return 1;
    }
    return 0;
}