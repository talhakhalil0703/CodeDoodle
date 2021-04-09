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

int main()
{
    int *x = new int[4];
    for (int i = 0; i < 4; i++)
    {
        x[i] = i;
    }
    Hello *hi = new Hello(5);
    char *str = "Hello World\n";
    // Break Point
    return 0;
}
