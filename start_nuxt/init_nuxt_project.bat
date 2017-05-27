@rem 
set project_name=%1
start vue init nuxt/starter %project_name%

%~d0
cd %~dp0%project_name% 
yarn add element-ui
pause