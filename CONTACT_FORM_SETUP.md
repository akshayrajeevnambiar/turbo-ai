# Contact Form Setup Instructions

## Overview
The contact form sends emails to both:
- jude@turbo-ai.ca (primary)
- akshayrajeevnambiar@gmail.com (secondary)

## Setup Steps

### 1. Get Your Web3Forms Access Key

1. Go to https://web3forms.com
2. Enter your email: **jude@turbo-ai.ca**
3. Click "Get Access Key"
4. Check your inbox for the access key email
5. Copy the access key from the email

### 2. Configure Environment Variable

#### Local Development:
1. Open the `.env` file in the project root
2. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-actual-access-key-here
   ```

#### Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new variable:
   - **Name:** `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value:** Your access key from Web3Forms
   - **Environments:** Select Production, Preview, and Development
4. Click "Save"
5. Redeploy your site for the changes to take effect

### 3. Test the Form

1. Fill out all required fields (Name, Email, Message)
2. Submit the form
3. Check both email inboxes:
   - jude@turbo-ai.ca
   - akshayrajeevnambiar@gmail.com
4. Both should receive the same message

## Features

- ✅ Sends to 2 email addresses simultaneously
- ✅ Custom subject line with sender's name
- ✅ Includes organization field
- ✅ Form validation
- ✅ Loading state with spinner
- ✅ Success/error toast notifications
- ✅ Spam protection built-in
- ✅ Free (up to 250 submissions/month)

## Troubleshooting

**Form not sending?**
- Check that the environment variable is set correctly
- Verify the access key is valid
- Check browser console for errors

**Emails not arriving?**
- Check spam folders
- Verify email addresses are correct in Connect.tsx (line with `cc`)
- Test with Web3Forms dashboard

## Free Tier Limits
- 250 submissions per month
- If you need more, upgrade at https://web3forms.com/pricing
