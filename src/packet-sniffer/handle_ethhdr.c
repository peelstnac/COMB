#include <stdio.h>
#include <string.h>
#include <net/ethernet.h> /* the L2 protocols */

void handle_ethhdr(char *store, char *buf, int r_len)
{
    // Define ethhdr struct
    struct ethhdr *ethh_ptr = (struct ethhdr *)buf;
// Print to console
#ifdef NDEBUG
    printf("Ethernet Header--------------------------------\n");
    printf("Destination MAC Address: %.2X-%.2X-%.2X-%.2X-%.2X-%.2X\n", ethh_ptr->h_dest[0], ethh_ptr->h_dest[1],
           ethh_ptr->h_dest[2], ethh_ptr->h_dest[3], ethh_ptr->h_dest[4], ethh_ptr->h_dest[5]);
    printf("Source MAC Address: %.2X-%.2X-%.2X-%.2X-%.2X-%.2X\n", ethh_ptr->h_source[0], ethh_ptr->h_source[1],
           ethh_ptr->h_source[2], ethh_ptr->h_source[3], ethh_ptr->h_source[4], ethh_ptr->h_source[5]);
    printf("Protocol ID: %d\n", ethh_ptr->h_proto);
#endif
    // Write to store
    char *ptr = store;
    ptr += strlen(store);
    ptr += sprintf(ptr, "0\n");
    ptr += sprintf(ptr, "0.1 %.2X-%.2X-%.2X-%.2X-%.2X-%.2X\n", ethh_ptr->h_dest[0], ethh_ptr->h_dest[1],
                   ethh_ptr->h_dest[2], ethh_ptr->h_dest[3], ethh_ptr->h_dest[4], ethh_ptr->h_dest[5]);
    ptr += sprintf(ptr, "0.2 %.2X-%.2X-%.2X-%.2X-%.2X-%.2X\n", ethh_ptr->h_source[0], ethh_ptr->h_source[1],
                   ethh_ptr->h_source[2], ethh_ptr->h_source[3], ethh_ptr->h_source[4], ethh_ptr->h_source[5]);
    ptr += sprintf(ptr, "0.3 %d\n", ethh_ptr->h_proto);
}