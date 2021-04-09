#include <string.h>

class Hello
{
public:
    int a_number;
    char name[6];
    Hello(int x);
};

Hello::Hello(int x) : a_number(x)
{
    strcpy(name, "NAME");
}

int x = 0;

int main()
{
    Hello *hi = new Hello(5);
    int *number = &(hi->a_number);
    // Break Point
    return 0;
}
