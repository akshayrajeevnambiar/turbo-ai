# Contact Form Setup Instructions

## Overview

The contact form sends emails to both:

- akshayrajeevnambiar@gmail.com (primary, controlled by the existing access key)
- Jude.tharakan@gmail.com (secondary/CC; requires a Web3Forms paid plan)

## Setup Steps

### 1. Get Your Web3Forms Access Key

1. Go to https://web3forms.com
2. Enter your primary email: **akshayrajeevnambiar@gmail.com**
3. Click "Get Access Key"
4. Check your inbox for the access key email
5. Copy the access key from the email

### 2. Configure Environment Variable

The primary recipient is determined by the Web3Forms access key, not by an
email address in the form code. To switch recipients, replace the existing key
with one registered to **Jude.tharakan@gmail.com** locally and in Vercel, then
redeploy. Updating this document alone does not change email delivery.

#### Local Development:

1. Open the `.env.local` file in the project root
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
   - akshayrajeevnambiar@gmail.com (primary)
   - Jude.tharakan@gmail.com (CC)
4. Both should receive the same message

## Features

- ✅ Sends to 2 email addresses simultaneously when CC is enabled on a paid plan
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
- Verify the CC email address is correct in Connect.tsx (line with `ccemail`)
- Confirm your Web3Forms plan supports CC recipients
- Test with Web3Forms dashboard

## Free Tier Limits

- 250 submissions per month
- If you need more, upgrade at https://web3forms.com/pricing
