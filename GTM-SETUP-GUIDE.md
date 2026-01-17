# Google Tag Manager Setup Guide

## Quick Setup Instructions

### Step 1: Get Your GTM Container ID

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Sign in with your Google account
3. Click **"Create Account"** or select an existing account
4. Fill in:
   - **Account Name:** Easy Tripper (or your business name)
   - **Country:** Sri Lanka
   - **Container Name:** easytripper.lk (or your domain)
   - **Target Platform:** Web
5. Click **"Create"**
6. Copy your **Container ID** (format: `GTM-XXXXXXX`)

### Step 2: Add GTM ID to Your Project

1. Create or edit `.env.local` file in your project root:
   ```bash
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

2. Replace `GTM-XXXXXXX` with your actual Container ID

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 3: Verify GTM is Working

#### Method 1: Using Browser DevTools
1. Open your website in Chrome
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Type: `dataLayer`
5. You should see an array with GTM data

#### Method 2: Using Google Tag Assistant
1. Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your website
3. Click the extension icon
4. You should see GTM container loaded

#### Method 3: Using GTM Preview Mode
1. In Google Tag Manager, click **"Preview"**
2. Enter your website URL
3. Click **"Connect"**
4. Your website will open in a new tab with GTM debug panel
5. Check if tags are firing correctly

### Step 4: Set Up Essential Tags in GTM

#### 1. Google Analytics 4 (GA4) Tag

1. In GTM, go to **Tags** → **New**
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Configuration**
   - Measurement ID: `G-7VB42L85CL` (or your GA4 ID)
3. Triggering:
   - Choose **All Pages**
4. Save and name it: "GA4 - Configuration"

#### 2. GA4 Page View Tag

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Configuration Tag: Select "GA4 - Configuration"
   - Event Name: `page_view`
3. Triggering:
   - Choose **All Pages**
4. Save and name it: "GA4 - Page View"

#### 3. Form Submission Tag

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Event Name: `form_submission`
   - Event Parameters:
     - `form_name`: `{{Form Name}}`
     - `form_location`: `{{Page URL}}`
3. Triggering:
   - Choose **Form Submission** trigger
   - Wait for Tags: 2000ms
   - Check Timeout: 3500ms
4. Save and name it: "GA4 - Form Submission"

#### 4. Phone Click Tracking

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Event Name: `phone_click`
   - Event Parameters:
     - `phone_number`: `{{Click Element}}`
3. Triggering:
   - Choose **Click - All Elements**
   - This trigger fires on: `Click Element` matches CSS selector `a[href^="tel:"]`
4. Save and name it: "GA4 - Phone Click"

#### 5. Email Click Tracking

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Event Name: `email_click`
3. Triggering:
   - Choose **Click - All Elements**
   - This trigger fires on: `Click Element` matches CSS selector `a[href^="mailto:"]`
4. Save and name it: "GA4 - Email Click"

#### 6. WhatsApp Click Tracking

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Event Name: `whatsapp_click`
3. Triggering:
   - Choose **Click - All Elements**
   - This trigger fires on: `Click URL` contains `wa.me` OR `api.whatsapp.com`
4. Save and name it: "GA4 - WhatsApp Click"

#### 7. Outbound Link Tracking

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Event Name: `outbound_click`
   - Event Parameters:
     - `link_url`: `{{Click URL}}`
     - `link_text`: `{{Click Text}}`
3. Triggering:
   - Choose **Click - All Elements**
   - This trigger fires on: `Click URL` does not contain your domain
4. Save and name it: "GA4 - Outbound Click"

#### 8. Scroll Depth Tracking

1. Create new tag
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Event**
   - Event Name: `scroll_depth`
   - Event Parameters:
     - `scroll_percentage`: `{{Scroll Depth Threshold}}`
3. Triggering:
   - Choose **Scroll Depth** trigger
   - Vertical Scroll Depths: 25, 50, 75, 90
4. Save and name it: "GA4 - Scroll Depth"

### Step 5: Set Up Variables (Optional but Recommended)

1. Go to **Variables** in GTM
2. Enable built-in variables:
   - Click Variables
   - Click **Configure**
   - Enable:
     - Page URL
     - Page Path
     - Page Title
     - Click Element
     - Click URL
     - Click Text

### Step 6: Test Your Tags

1. Use GTM Preview Mode (see Step 3, Method 3)
2. Test each trigger:
   - Visit different pages
   - Click phone numbers
   - Click email links
   - Submit forms
   - Click external links
3. Verify tags fire in the debug panel

### Step 7: Publish Your Container

1. Once everything is tested, click **"Submit"** in GTM
2. Add version name: "Initial Setup - [Date]"
3. Add description: "Initial GTM setup with GA4 and conversion tracking"
4. Click **"Publish"**

### Step 8: Verify in Google Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Navigate to **Reports** → **Realtime**
3. Visit your website
4. You should see your visit in real-time
5. Check **Events** to see custom events firing

---

## Troubleshooting

### GTM Not Loading

**Problem:** GTM container not appearing in browser

**Solutions:**
1. Check if `NEXT_PUBLIC_GTM_ID` is set correctly in `.env.local`
2. Restart your development server
3. Clear browser cache
4. Check browser console for errors
5. Verify GTM ID format is correct (`GTM-XXXXXXX`)

### Tags Not Firing

**Problem:** Tags not triggering in GTM Preview Mode

**Solutions:**
1. Check trigger conditions are correct
2. Verify CSS selectors match your HTML
3. Check if tags are enabled
4. Ensure container is published
5. Check browser console for JavaScript errors

### DataLayer Not Working

**Problem:** Custom events not pushing to dataLayer

**Solutions:**
1. Ensure GTM script loads before your custom code
2. Check dataLayer syntax: `dataLayer.push({event: 'custom_event'})`
3. Use GTM Preview Mode to debug
4. Verify dataLayer is initialized: `console.log(window.dataLayer)`

---

## Best Practices

1. **Always test in Preview Mode** before publishing
2. **Use descriptive tag names** (e.g., "GA4 - Form Submission - Contact")
3. **Document your tags** with descriptions
4. **Use version control** - add notes when publishing
5. **Monitor tag performance** in GA4
6. **Keep GTM container organized** with folders
7. **Test on multiple browsers** and devices
8. **Set up triggers carefully** to avoid duplicate events

---

## Advanced: Custom Events from Your Code

You can push custom events from your React/Next.js code:

```typescript
import { trackGTMEvent, trackConversion } from '@/components/analytics/GoogleTagManager';

// Track custom event
trackGTMEvent('tour_view', {
  tour_name: 'Cultural Heritage Tour',
  tour_price: 150,
  currency: 'USD'
});

// Track conversion
trackConversion('inquiry_form', 0, 'USD');
```

---

## Resources

- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [GTM Community Forum](https://support.google.com/tagmanager/community)
- [GTM Simulator](https://tagassistant.google.com/)
- [DataLayer Helper](https://github.com/google/data-layer-helper)

---

## Support

If you encounter issues:
1. Check GTM Preview Mode for errors
2. Review browser console for JavaScript errors
3. Verify all environment variables are set
4. Check GTM container is published
5. Review this guide's troubleshooting section
