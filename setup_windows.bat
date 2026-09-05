@echo off
python -m venv venv
call venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt

if not exist .env (
    copy .env.example .env
)

echo.
echo Setup complete.
echo Edit .env and add your Tavily API key.
echo Then run run_windows.bat
pause
