#include <stdio.h>
#include <string.h>
#include <net/ethernet.h>
#include <netinet/ip.h> /* superset of previous */
#include <arpa/inet.h>

void handle_ip(char* store, char* buf, int r_len) {
    // Struct reference https://stackoverflow.com/questions/42840636/difference-between-struct-ip-and-struct-iphdr

    struct ip* iph_ptr = (struct ip*)(buf + sizeof(struct ethhdr));

    char dest_4[INET_ADDRSTRLEN];
    char dest_6[INET6_ADDRSTRLEN];
    inet_ntop(AF_INET, &(iph_ptr->ip_dst), dest_4, INET_ADDRSTRLEN);
    // inet_ntop(AF_INET6, &(iph_ptr->ip_dst), dest_6, INET6_ADDRSTRLEN);
    char src_4[INET_ADDRSTRLEN];
    char src_6[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &(iph_ptr->ip_src), src_4, INET_ADDRSTRLEN);
    // inet_ntop(AF_INET6, &(iph_ptr->ip_src), src_6, INET6_ADDRSTRLEN);

    #ifdef NDEBUG
        printf("IP Header--------------------------------------\n");
        printf("Header Length: %d\n", iph_ptr->ip_hl);
        printf("IP Version: %d\n", iph_ptr->ip_v);
        printf("Destination: %s\n", dest_4);
        // printf("Destination IPv6: %s\n", dest_6);
        printf("Source: %s\n", src_4);
        // printf("Source IPv6: %s\n", src_6);
        printf("Type of Service: %d\n", iph_ptr->ip_tos);
        printf("Total Length: %d\n", ntohs(iph_ptr->ip_len));
        printf("Identification: %d\n", ntohs(iph_ptr->ip_id));
        printf("Time to Live: %d\n", iph_ptr->ip_ttl);
        printf("Protocol: %d\n", iph_ptr->ip_p);
        printf("Checksum: %d\n", iph_ptr->ip_sum);
    #endif
    // Write to store
    char* ptr = store;
    ptr += strlen(store);
    ptr += sprintf(ptr, "1\n");
    ptr += sprintf(ptr, "1.1 %d\n", iph_ptr->ip_hl);
    ptr += sprintf(ptr, "1.2 %d\n", iph_ptr->ip_v);
    ptr += sprintf(ptr, "1.3 %s\n", dest_4);
    ptr += sprintf(ptr, "1.4 %s\n", src_4);
    ptr += sprintf(ptr, "1.5 %d\n", iph_ptr->ip_tos);
    ptr += sprintf(ptr, "1.6 %d\n", ntohs(iph_ptr->ip_len));
    ptr += sprintf(ptr, "1.7 %d\n", ntohs(iph_ptr->ip_id));
    ptr += sprintf(ptr, "1.8 %d\n", iph_ptr->ip_ttl);
    ptr += sprintf(ptr, "1.9 %d\n", iph_ptr->ip_p);
    ptr += sprintf(ptr, "1.10 %d\n", iph_ptr->ip_sum);
}