# Deployment Guide - GitHub Setup

## Step 1: Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Or for this repository only:
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 2: Create Initial Commit

```bash
cd /home/eduardo/Proyectos/CharacterSheet
git commit -m "Initial commit: D&D Character Sheet application"
```

## Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository name: `CharacterSheet` (or your preferred name)
4. Description: "D&D 5.5e Character Sheet Application"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 4: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/CharacterSheet.git

# Push to GitHub
git push -u origin main
```

If you're using SSH instead:
```bash
git remote add origin git@github.com:YOUR_USERNAME/CharacterSheet.git
git push -u origin main
```

## Step 5: Verify

Visit `https://github.com/YOUR_USERNAME/CharacterSheet` to see your code!

## Next Steps: Deploy to Production

After pushing to GitHub, you can deploy to:
- **Frontend**: Vercel (connects to GitHub automatically)
- **Backend**: Render or Railway
- **Database**: Supabase or Neon

See the main README for deployment details.
