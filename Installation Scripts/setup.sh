#!/bin/bash
echo Installing BASH if not Installed
sudo apt-get install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash -y
 
echo INSTALLING Node and NPM
sudo apt-get install nodejs -y	
sudo apt install npm -y
sudo nvm install node
sudo nvm install --lts
 
echo INSTALLING React
sudo npm install -g create-react-app -y
 
echo INSTALLING Python and Modules
sudo apt update -y
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3.8 -y
sudo apt install python3-pip -y
 
python3 -m pip install cors
 
echo INSTALLING GDB
sudo apt-get install gcc -y
sudo apt-get install gdb -y
 
echo INSTALLING Valgrind
sudo apt-get install valgrind -y
 
echo INSTALLING Git
sudo apt-get install git -y

echo Grabbing Repository
git clone https://github.com/talhakhalil0703/CodeDoodle.git
 
echo INSTALLING Repository Packages
cd CodeDoodle
sudo npm i
cd C/Source/
sudo npm i
