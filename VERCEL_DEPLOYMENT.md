# Vercel Deployment Guide - Fixing Product Upload Issues

## Problem Summary

The error `"Unexpected token 'T', "The deploy"... is not valid JSON` occurs when:
1. API routes return HTML error pages instead of JSON
2. Environment variables are missing in Vercel
3. MongoDB connection fails
4. Function timeout is too short

## ✅ Solutions Applied

### 1. Enhanced Error Handling
- All API routes now always return JSON, even on errors
- Added proper Content-Type headers
- Better error messages for debugging

### 2. Increased Function Timeout
- Updated `vercel.json` to set `maxDuration: 60` seconds (was 30)
- This allows enough time for file uploads to Cloudinary

### 3. Improved MongoDB Connection
- Added connection timeouts
- Better error handling for connection failures

## 🔧 Required Vercel Configuration

### Step 1: Add Environment Variables in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables and add:

```env
MONGODB_URI=mongodb+srv://alankarika25jewels_db_user:85cVadlKxdN3FRsd@cluster0.mihqx3i.mongodb.net/alankarika?retryWrites=true&w=majority&appName=Cluster0

CLOUDINARY_CLOUD_NAME=dzs85rccr
CLOUDINARY_API_KEY=563775748192214
CLOUDINARY_API_SECRET=Yj4ONzhLsminRC65Zv6C2NpyEG0

JWT_SECRET=alankarika_jwt_secret_2024
NEXTAUTH_SECRET=alankarika_nextauth_secret_2024
NEXTAUTH_URL=https://your-vercel-app.vercel.app
```

**Important:** 
- Replace `your-vercel-app.vercel.app` with your actual Vercel domain
- Make sure to add these for **Production**, **Preview**, and **Development** environments

### Step 2: Verify MongoDB Atlas Settings

1. Go to MongoDB Atlas Dashboard
2. Check **Network Access**:
   - Add `0.0.0.0/0` to allow all IPs (or Vercel's IP ranges)
   - Or add specific Vercel IPs if you prefer

3. Check **Database Access**:
   - Ensure your database user has read/write permissions
   - Username: `alankarika25jewels_db_user`
   - Password: `85cVadlKxdN3FRsd`

### Step 3: Redeploy After Changes

After adding environment variables:
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 4: Test the API

After redeployment, test the API endpoint:
```bash
curl https://your-app.vercel.app/api/products
```

Should return JSON:
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

## 🐛 Troubleshooting

### Error: 503 Service Unavailable
- **Cause**: MongoDB connection timeout
- **Fix**: Check MongoDB URI and network access settings

### Error: 404 Not Found
- **Cause**: API route not found
- **Fix**: Ensure `app/api/products/route.ts` exists and is committed

### Error: "The deploy..." HTML response
- **Cause**: Vercel function error returning HTML page
- **Fix**: 
  1. Check Vercel function logs
  2. Verify environment variables are set
  3. Check MongoDB connection string

### Error: Function timeout
- **Cause**: File upload taking too long
- **Fix**: Already fixed with `maxDuration: 60` in vercel.json

## 📋 Checklist

- [ ] Environment variables added in Vercel dashboard
- [ ] MongoDB Atlas network access configured
- [ ] MongoDB database user has correct permissions
- [ ] Cloudinary credentials are correct
- [ ] Redeployed after adding environment variables
- [ ] Tested API endpoint returns JSON
- [ ] Tested product upload from dashboard

## 🔍 Debugging Tips

1. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the function to see logs

2. **Test API Directly**:
   ```bash
   # Test GET
   curl https://your-app.vercel.app/api/products
   
   # Test POST (with form data)
   curl -X POST https://your-app.vercel.app/api/products \
     -F "name=Test Product" \
     -F "description=Test" \
     -F "price=100" \
     -F "quantity=1" \
     -F "category=Rings"
   ```

3. **Check Browser Console**:
   - Open browser DevTools → Network tab
   - Look for the API request
   - Check the Response tab to see what's being returned

## 📞 Support

If issues persist:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Verify all environment variables are set correctly
4. Ensure database name in connection string matches your Atlas database

