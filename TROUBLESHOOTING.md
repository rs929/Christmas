# 🔧 GitHub Pages Deployment Troubleshooting

## If GitHub Actions Deployment Failed

### Step 1: Enable Pages Environment First

1. Go to your repository: https://github.com/rs929/Christmas
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (this creates the environment)
4. Save

### Step 2: Check Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, make sure:
   - ✅ "Read and write permissions" is selected
   - ✅ "Allow GitHub Actions to create and approve pull requests" is checked

### Step 3: Alternative - Use Branch Deployment (Easier)

If GitHub Actions keeps failing, use the simpler branch method:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

This method doesn't require GitHub Actions and is more reliable for simple static sites.

### Step 4: Check for Errors

1. Go to **Actions** tab in your repository
2. Click on the failed workflow
3. Check the error message
4. Common issues:
   - **"Environment not found"**: Enable Pages first (Step 1)
   - **"Permission denied"**: Fix permissions (Step 2)
   - **"No such file"**: Make sure `index.html` is in the root

### Step 5: Manual Trigger

If you made changes, you can manually trigger the workflow:

1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select **main** branch
5. Click **Run workflow**

## Quick Fix: Use Branch Deployment

The simplest solution is to use branch deployment instead of GitHub Actions:

1. **Settings** → **Pages**
2. **Source**: Select **Deploy from a branch**
3. **Branch**: **main** / **/ (root)**
4. **Save**

Your site will be at: `https://rs929.github.io/Christmas/`

This method is more reliable and doesn't require workflow configuration!

