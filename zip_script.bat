
@echo off
REM Windows script to ZIP excluding node_modules
echo Creating ZIP...
tar --exclude='node_modules' -czf sap-content-server.zip sap-content-server
echo Done.
