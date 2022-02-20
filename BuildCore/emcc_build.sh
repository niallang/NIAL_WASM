mkdir -p build
cd build
cmake -DCMAKE_SYSTEM_PROCESSOR=x86_64 -DCMAKE_TOOLCHAIN_FILE=/home/johng/Emscripten/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_BUILD_TYPE=Debug -G "Unix Makefiles" ../src
make
echo 'Done'
exit
