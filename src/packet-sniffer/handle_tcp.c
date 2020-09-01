#include <stdio.h>
#include <string.h>
#include <net/ethernet.h>
#include <netinet/ip.h> /* superset of previous */
#include <netinet/tcp.h>
#include <arpa/inet.h>

void handle_tcp(char *store, char *buf, int r_len)
{
    // Must multiply ihl by 4 https://www.informit.com/articles/article.aspx?p=29578&seqNum=5
    struct ip *iph_ptr = (struct ip *)(buf + sizeof(struct ethhdr));
    // Struct reference https://www.cs.vu.nl/~herbertb/projects/corral/docs/html/grabber_8h-source.html#l00082
    struct tcphdr *tcph_ptr = (struct tcphdr *)(buf + (iph_ptr->ip_hl) * 4 + sizeof(struct ethhdr));

#ifdef NDEBUG
    printf("TCP Header-------------------------------------\n");
    printf("Destination Port: %u\n", tcph_ptr->dest);
    printf("Source Port: %u\n", tcph_ptr->dest);
    printf("seq: %u\n", ntohl(tcph_ptr->seq));
    printf("ack_seq: %u\n", ntohl(tcph_ptr->ack_seq));
    printf("res1: %d\n", ntohs(tcph_ptr->res1));
    printf("res2: %d\n", ntohs(tcph_ptr->res2));
    printf("doff: %d\n", ntohs(tcph_ptr->doff));
    printf("fin: %d\n", ntohs(tcph_ptr->fin));
    printf("syn: %d\n", ntohs(tcph_ptr->syn));
    printf("rst: %d\n", ntohs(tcph_ptr->rst));
    printf("psh: %d\n", ntohs(tcph_ptr->psh));
    printf("ack: %d\n", ntohs(tcph_ptr->ack));
    printf("urg: %d\n", ntohs(tcph_ptr->urg));
    printf("window: %d\n", ntohs(tcph_ptr->window));
    printf("check: %d\n", ntohs(tcph_ptr->check));
    printf("urg_ptr: %d\n", ntohs(tcph_ptr->urg_ptr));
#endif
    // Write to store
    char *ptr = store;
    ptr += strlen(store);
    ptr += sprintf(ptr, "2\n");
    ptr += sprintf(ptr, "2.1 %u\n", tcph_ptr->dest);
    ptr += sprintf(ptr, "2.2 %u\n", tcph_ptr->dest);
    ptr += sprintf(ptr, "2.3 %u\n", ntohl(tcph_ptr->seq));
    ptr += sprintf(ptr, "2.4 %u\n", ntohl(tcph_ptr->ack_seq));
    ptr += sprintf(ptr, "2.5 %d\n", ntohs(tcph_ptr->res1));
    ptr += sprintf(ptr, "2.6 %d\n", ntohs(tcph_ptr->res2));
    ptr += sprintf(ptr, "2.7 %d\n", ntohs(tcph_ptr->doff));
    ptr += sprintf(ptr, "2.8 %d\n", ntohs(tcph_ptr->fin));
    ptr += sprintf(ptr, "2.9 %d\n", ntohs(tcph_ptr->syn));
    ptr += sprintf(ptr, "2.10 %d\n", ntohs(tcph_ptr->rst));
    ptr += sprintf(ptr, "2.11 %d\n", ntohs(tcph_ptr->psh));
    ptr += sprintf(ptr, "2.12 %d\n", ntohs(tcph_ptr->ack));
    ptr += sprintf(ptr, "2.13 %d\n", ntohs(tcph_ptr->urg));
    ptr += sprintf(ptr, "2.14 %d\n", ntohs(tcph_ptr->window));
    ptr += sprintf(ptr, "2.15 %d\n", ntohs(tcph_ptr->check));
    ptr += sprintf(ptr, "2.16 %d\n", ntohs(tcph_ptr->urg_ptr));
}