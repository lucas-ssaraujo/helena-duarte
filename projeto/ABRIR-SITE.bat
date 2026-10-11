@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Para iniciar, instale o Node.js e abra este arquivo novamente.
 echo Download oficial: https://nodejs.org/
 pause
 exit /b 1
)
node servidor-local.cjs
pause
