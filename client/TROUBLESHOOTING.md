# Troubleshooting 404 Errors

## Common 404 Issues and Solutions

### 1. Image Assets Not Found

**Problem**: Images showing as broken or 404 errors in console

**Solution**:

- Images should be in `public/assets/images/`
- Reference them as `/assets/images/filename.jpg` in components
- ✅ Images have been copied to `public/assets/images/`

### 2. CSS Files Not Found

**Problem**: Styles not loading

**Solution**:

- CSS files are imported from `src/assets/mut/css/`
- These are processed by Vite and should work
- If issues persist, check import paths in components

### 3. API Endpoints 404

**Problem**: API calls returning 404

**Causes**:

- Backend server not running
- Wrong API URL in `.env`
- CORS issues

**Solutions**:

1. **Check Backend is Running**:

   ```bash
   cd mut-backend
   npm run dev
   ```

   Should see: `Server running on port 5000`

2. **Verify API URL**:
   - Check `mut-react/.env` has: `VITE_API_URL=http://localhost:5000/api`
   - Restart frontend dev server after changing `.env`

3. **Test Backend Health**:
   - Visit: `http://localhost:5000/health`
   - Should return: `{"status":"ok",...}`

4. **Check CORS**:
   - Verify `FRONTEND_URL` in `mut-backend/.env` matches frontend URL
   - Default: `FRONTEND_URL=http://localhost:5173`

### 4. Route 404 Errors

**Problem**: React Router showing 404 for routes

**Solution**:

- Check `App.tsx` has all routes defined
- Verify route paths match navigation links
- Check for typos in route paths

### 5. Font Files Not Loading

**Problem**: Custom fonts not displaying

**Solution**:

- Fonts are in `src/assets/mut/fonts/`
- CSS should reference them correctly
- Check browser console for specific font file 404s

## Quick Diagnostic Steps

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Look at Network tab
   - Find the 404 request
   - Note the exact URL that's failing

2. **Check Backend Logs**:
   - Look at terminal where backend is running
   - Check for error messages

3. **Verify File Paths**:
   - For images: Should be in `public/assets/images/`
   - For CSS: Should be imported from `src/assets/mut/css/`
   - For API: Should use `VITE_API_URL` from `.env`

## Common Fixes

### Fix Image 404s:

```bash
# Images should be in public folder
# Already done: public/assets/images/ contains all images
```

### Fix API 404s:

```bash
# 1. Start backend
cd mut-backend
npm run dev

# 2. Verify .env files
# mut-react/.env should have: VITE_API_URL=http://localhost:5000/api
# mut-backend/.env should have: FRONTEND_URL=http://localhost:5173

# 3. Restart frontend after .env changes
cd mut-react
npm run dev
```

### Fix CSS 404s:

- CSS files are imported correctly
- If issues persist, check import statements in components

## Still Having Issues?

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R)
2. **Restart Dev Servers**: Stop and restart both frontend and backend
3. **Check File Permissions**: Ensure files are readable
4. **Verify Ports**:
   - Frontend: 5173 (Vite default)
   - Backend: 5000 (check .env)
