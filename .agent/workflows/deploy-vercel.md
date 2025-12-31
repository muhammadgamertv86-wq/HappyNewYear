---
description: How to deploy the HappyNewYear project to Vercel
---

1. **Push your code to GitHub**
   - Create a new repository on [GitHub](https://github.com/new).
   - In your terminal, run:
     ```bash
     git add .
     git commit -m "Initial commit - Happy New Year project"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com) and sign up/log in with your GitHub account.
   - Click **"Add New"** and then **"Project"**.
   - Import the `HappyNewYear` repository you just created.

3. **Configure Settings**
   - Vercel should automatically detect that it's a **Vite** project.
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Deploy**
   - Click **"Deploy"**.
   - Wait about 1 minute, and you'll get a live link (e.g., `happy-new-year.vercel.app`) to share!
