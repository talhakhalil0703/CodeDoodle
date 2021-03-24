#include <stdlib.h>
#include <string.h>

//disable warnings with -w
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

int *foo()
{
    int x = 5;
    int *y = &x;
    return y;
}

int main()
{
    int *x = foo();
    int *y = NULL;
    char *c = "Hello World";
    char *d = "\"Goodbye World\'";
    int *z = new int[3];
    Hello *hi = new Hello(3000, 2500);
    int bleh = 0;
    int *i = foo();
    return 0;
}

//"Random Comment"
