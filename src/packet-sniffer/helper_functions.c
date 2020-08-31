#include <stdio.h>
#include <string.h>

void new_file(FILE** file, char src[50]) {
    char dest[50] = "./";
    strcat(dest, src);
    *file = fopen(dest, "w+");
}

void handle_err() {
    printf("An error occured. Please consult build/error_log.txt for more info. \n");
}