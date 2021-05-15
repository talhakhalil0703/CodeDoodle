# CodeDoodle

## Source Code

Server Code is Located Under: CodeDoodle/C/Source
Frontend Code is Located Under: CodeDoodle/src

## Installation Steps

The installation scripts are located under CodeDoodle/Installation Scripts, these will help automate the installation and setup process.

## Windows Systems

Please follow these instructions to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
For the virtual machine please enable virtualization in your BIOS as well: [Instructions](https://support.bluestacks.com/hc/en-us/articles/115003174386-How-to-enable-Virtualization-VT-on-Windows-10-for-BlueStacks-4#%E2%80%9C9%E2%80%9D)

Run ubuntu as admin (First time WSL Setup)

```
In the ubunutu terminal type in unix name
In the ubunutu terminal type in admin password
In the ubunutu terminal type in: explorer.exe .
```

Drag in setup.sh to the folder that just opened

```
In the ubunutu terminal type in: sudo chmod u+x setup.sh
In the ubunutu terminal type in: sudo ./setup.sh
```

After installing launch the backend_server and frontend_server from anywhere by double clicking, and type in your linux root password.

## Linux Systems

```
In the terminal type in: sudo chmod u+x setup.sh
In the terminal type in: sudo ./setup.sh
In the terminal type in: sudo chmod u+x backend_server.bat
In the terminal type in: sudo chmod u+x frontend_server.bat
```

To launch the servers:

```
sudo ./backend_server.bat
sudo ./frontend_server.bat
```
