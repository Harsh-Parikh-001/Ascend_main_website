# Ascend Trade Commercial Website

Runnable development scaffold for the Ascend Trade Commercial website.

## Requirements

- Python 3.14
- Node.js 24 or another version supported by the installed Vite release
- npm

## Start the backend

Open PowerShell at the repository root:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
Set-Location backend
.\.venv\Scripts\Activate.ps1
python --version
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

`python --version` should report `Python 3.14.0`.

The backend will be available at:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/api/health
- http://127.0.0.1:8000/docs

## Start the frontend

Open a second PowerShell terminal at the repository root:

```powershell
Set-Location frontend
npm.cmd run dev
```

Open http://localhost:5173/. The page will confirm whether it can reach the
backend health endpoint.

Use `Ctrl+C` in each terminal to stop the servers. Run `deactivate` in the
backend terminal when you are finished with the virtual environment.
