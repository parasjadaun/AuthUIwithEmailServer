# Full-Stack Project Commands

This project contains two separate applications:

- `Frontend` - React + Vite application
- `Backend` - Express + MongoDB API

## 1. Install dependencies

Run these commands from the project root after cloning/downloading the project:

```powershell
cd "C:\Users\FullStack Project"

cd Backend
npm install

cd ..\Frontend
npm install

cd ..
```

## 2. Configure backend environment variables

Create `Backend\.env` and add your real values:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 3. Run frontend and backend separately (development)

Open **two terminals** at the project root.

**Terminal 1 - start the backend:**

```powershell
cd Backend
npm run dev
```

The API runs at `http://localhost:3000`.

**Terminal 2 - start the frontend:**

```powershell
cd Frontend
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`).

## 4. Run both applications with one command

From the root folder, create a root `package.json` and install `concurrently`:

```powershell
cd "C:\Users\Project"
npm init -y
npm install --save-dev concurrently
```

Then add these scripts to the root `package.json`:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix Backend\" \"npm run dev --prefix Frontend\"",
  "start": "npm run start --prefix Backend",
  "build": "npm run build --prefix Frontend"
}
```

Now start both projects together:

```powershell
npm run dev
```

## 5. Connect the frontend to the backend

Use the backend URL in frontend API requests:

```js
const API_URL = "http://localhost:3000";
```

The backend already uses CORS, which lets the Vite frontend communicate with it during development.

## 6. Build the frontend for deployment

```powershell
cd Frontend
npm run build
```

This creates the production frontend files in `Frontend\dist`. Deploy the `Frontend\dist` folder to a static hosting service and deploy the `Backend` folder as a Node.js service. Update the frontend API URL to your deployed backend URL before production deployment.
