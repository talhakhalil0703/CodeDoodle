#include <stdlib.h>
#include <string.h>

class Goodbye
{
public:
    int another_number;
    Goodbye(int x);
};

Goodbye::Goodbye(int x) : another_number(x)
{
}

class Hello
{
public:
    int a_number;
    char name[24];
    Goodbye bye;
    Hello(int x, int y);
};

Hello::Hello(int x, int y) : a_number(x), bye(y)
{
    strcpy(name, "NAME");
}

void foo(int &z)
{
    int y = 0;
}

int main(int argc, char *argv[])
{
    Hello hi(2, 7);
    Hello *yo = new Hello(3, 5);
    int *num_p = &(yo->a_number);
    int *heap_number = new int(5);
    int ref = 5;
    foo(ref);
    return 0;
}