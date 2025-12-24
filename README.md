# 🐠 Aquarium Gift Card Delivery Website

A beautiful, mobile-optimized website for delivering an aquarium-themed e-gift card as a gag gift!

## Features

- 🎨 Beautiful aquarium theme with animated fish and bubbles
- 📱 Optimized for iPhone/mobile view
- 🔒 Password protection to keep it private
- 🎁 Interactive gift card reveal animation
- ✨ Smooth animations and transitions

## 🔒 Security & Deployment Options

**IMPORTANT**: Since this is a client-side website, the password is visible in the JavaScript code. Here are your options:

### Option 1: Make Repository Private (BEST for Security) ⭐

**This is the safest option:**

1. **Before pushing to GitHub:**
   - Make sure your password is set in `script.js` (it's base64 encoded for basic obfuscation)
   - Push your code to GitHub

2. **Make the repository private:**
   - Go to **Settings** → **General** → **Danger Zone**
   - Click **Change visibility** → **Make private**
   - Only people you invite can see the code

3. **Deploy to GitHub Pages:**
   - **Free option**: Private repos need GitHub Pro ($4/month) for GitHub Pages
   - **Alternative**: Use GitHub Actions to deploy to a free service like:
     - Netlify (supports private repos)
     - Vercel (supports private repos)
     - Cloudflare Pages (supports private repos)

### Option 2: Use a Different Hosting Service

Deploy to services that support private repositories:

- **Netlify**: Free, supports private GitHub repos
- **Vercel**: Free, supports private GitHub repos  
- **Cloudflare Pages**: Free, supports private GitHub repos

These services can pull from your private GitHub repo without exposing the code publicly.

### Option 3: Accept Limited Security (For Gag Gifts)

If you're okay with the password being discoverable (it's just a gag gift):

1. The password is base64 encoded (basic obfuscation)
2. Most people won't look at the source code
3. Change the password after they've seen it
4. Use a unique, non-obvious password

**Note**: Anyone who views the page source can find and decode the password. This is fine for a fun gift, but not for sensitive information.

## Setup & Deployment to GitHub Pages

### Step 1: Change the Password

Before deploying, **change the password** in `script.js`:

The password is base64 encoded. To change it:
1. Choose your password (e.g., `mySecret123`)
2. Encode it at https://www.base64encode.org/ or use browser console: `btoa('mySecret123')`
3. Replace the `PASSWORD_HASH` value in `script.js`

```javascript
const PASSWORD_HASH = btoa('your-password-here'); // Replace 'your-password-here'
```

### Step 2: Push to GitHub

1. Create a new repository on GitHub
2. **IMPORTANT**: Consider making it private first (see Option 1 above)
3. Push your code:

```bash
git add .
git commit -m "Initial commit - Christmas aquarium gift card website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**Note**: If your repo is private, you'll need GitHub Pro for Pages, or use one of the alternative hosting services mentioned above.

## Customization

- **Password**: Edit `CORRECT_PASSWORD` in `script.js`
- **Colors**: Modify the gradient colors in `style.css`
- **Gift Card Value**: Update the card display in `index.html`
- **Message**: Customize the text in `index.html`

## Files

- `index.html` - Main HTML structure
- `style.css` - Aquarium-themed styling and animations
- `script.js` - Password protection and interactive features

Enjoy your gift! 🎁🐠
