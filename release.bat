@echo off
echo Gerando Release app...
cd android
call gradlew bundleRelease
cd app\build\outputs\bundle\release
explorer .
cd ..\..\..\..\..\..
