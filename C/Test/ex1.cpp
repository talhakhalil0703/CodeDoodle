#include <stdlib.h>
#include <string.h>
class Hello
{
public:
    int a_number;
    char name[24];
    Hello(int x);
};

Hello::Hello(int x) : a_number(x)
{
    strcpy(name, "NAME");
}

int main(int argc, char *argv[])
{
    Hello hi(2);
    Hello *yo = new Hello(3);
    int *num_p = &(yo->a_number);
    return 0;
}