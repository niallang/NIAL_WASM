mkdir -p build
cd build
CC=emcc cmake ../src
UNIXSYS=1 LINUX=1 make
echo 'Done'
exit
