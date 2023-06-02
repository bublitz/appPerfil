@echo off
call nvm use 16.20.0
rem set NODE_OPTIONS=--openssl-legacy-provider
call yarn install
echo Gerando Release app...
cd android
call gradlew bundleRelease
set NODE_OPTIONS=
cd app\build\outputs\bundle\release
explorer .
cd ..\..\..\..\..\..
