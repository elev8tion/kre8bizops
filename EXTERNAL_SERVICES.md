# External Services Reference

## 🚫 Services Removed from Original

This document lists all external URLs and cloud services that were **removed** to create a fully local, modular application.

### ❌ Removed External Services

#### 1. Google Services

**Google Fonts**
```html
<!-- REMOVED -->
<link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&family=Roboto:400,500,700" rel="stylesheet"/>
```
- **Purpose:** Web fonts (Poppins, Roboto)
- **Local Alternative:** Add local font files or use system fonts
- **File Location:** Would be in `/fonts` directory

**Google Tag Manager**
```javascript
// REMOVED
(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-WXNKTSB');
```
- **Purpose:** Analytics and tracking
- **Container ID:** GTM-WXNKTSB
- **Local Alternative:** Self-hosted analytics (Matomo, Plausible)

**Google reCAPTCHA**
```html
<!-- REMOVED -->
<script src="https://www.google.com/recaptcha/api.js"></script>
```
- **Purpose:** Bot protection
- **Local Alternative:** Custom CAPTCHA or rate limiting

#### 2. Agiled Platform Services

**Theme Stylesheets**
```html
<!-- REMOVED -->
<link href="https://elev8tion.agiled.app/stylesheets/theme.min.css" rel="stylesheet"/>
<link href="https://elev8tion.agiled.app/stylesheets/theme-dark.min.css" rel="stylesheet"/>
<link href="https://elev8tion.agiled.app/stylesheets/custom.css" rel="stylesheet"/>
```
- **Purpose:** Application themes
- **Now Local:** Included in `css/theme-and-custom.css`

**Font Awesome**
```html
<!-- REMOVED -->
<link href="https://elev8tion.agiled.app/plugins/fontawesome/css/all.css" rel="stylesheet"/>
```
- **Purpose:** Icon library
- **Now Local:** Included in `css/fontawesome.css`

**JavaScript Libraries**
```html
<!-- REMOVED -->
<script src="https://elev8tion.agiled.app/plugins/jquery/jquery.min.js"></script>
<script src="https://elev8tion.agiled.app/plugins/bootstrap/js/popper.min.js"></script>
<script src="https://elev8tion.agiled.app/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="https://elev8tion.agiled.app/js/theme.min.js"></script>
<script src="https://elev8tion.agiled.app/plugins/agiled-helper/helper.js"></script>
```
- **Purpose:** jQuery, Bootstrap, custom scripts
- **Now Local:** Included in `js/jquery-and-plugins.js` and `js/custom.js`

**Images & Assets**
```html
<!-- REMOVED -->
<link href="https://elev8tion.agiled.app/favicon/favicon-32x32.png" rel="shortcut icon"/>
<img src="https://elev8tion.agiled.app/agiled-logo-color.png"/>
<div style="background-image: url(https://elev8tion.agiled.app/images/login_background.jpeg)">
```
- **Purpose:** Branding assets
- **Now Local:** Use `images/logo.png`, `images/background.jpg`, `favicon.ico`

**API Endpoints**
```html
<!-- REMOVED -->
<form action="https://elev8tion.agiled.app/login" method="POST">
<a href="https://elev8tion.agiled.app/password/reset">
<a href="https://my.agiled.app/signup">
```
- **Purpose:** Authentication endpoints
- **Now Local:** Configure in `config.json` → `api.endpoints`

#### 3. External Links

**Privacy & Terms**
```html
<!-- REMOVED -->
<a href="https://agiled.app/privacy-policy/">Privacy</a>
<a href="https://agiled.app/terms-of-service/">Terms</a>
```
- **Now Local:** Link to local `privacy.html` and `terms.html`

## ✅ How to Add Them Back (Optional)

### Option 1: Configuration File

Edit `config.json` to enable external services:

```json
{
  "externalServices": {
    "recaptcha": {
      "enabled": true,
      "siteKey": "YOUR_SITE_KEY"
    },
    "cdn": {
      "enabled": true,
      "jquery": "https://code.jquery.com/jquery-3.4.1.min.js"
    },
    "fonts": {
      "enabled": true,
      "google": {
        "families": ["Poppins:400,500,600,700", "Roboto:400,500,700"]
      }
    }
  },
  "analytics": {
    "enabled": true,
    "providers": {
      "googleTagManager": {
        "enabled": true,
        "containerId": "GTM-XXXXX"
      }
    }
  }
}
```

### Option 2: Conditional Loading

Create a service loader in your HTML:

```html
<!-- config-loader.js -->
<script>
    const config = await fetch('config.json').then(r => r.json());

    // Load Google Fonts if enabled
    if (config.externalServices.fonts.enabled) {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css?family=Poppins:400,500,600,700';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }

    // Load analytics if enabled
    if (config.analytics.enabled && config.analytics.providers.googleTagManager.enabled) {
        // Load GTM script
        (function(w,d,s,l,i){
            // GTM code here
        })(window,document,'script','dataLayer', config.analytics.providers.googleTagManager.containerId);
    }

    // Load reCAPTCHA if enabled
    if (config.externalServices.recaptcha.enabled) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        document.head.appendChild(script);
    }
</script>
```

## 📋 CDN Alternatives

If you want to use CDNs instead of local files:

### Font Awesome
```html
<!-- Latest version -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Version 5.11.2 (original) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
```

### jQuery
```html
<!-- jQuery 3.4.1 (original) -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<!-- Latest jQuery 3.x -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

### Bootstrap
```html
<!-- Bootstrap 4.6.0 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Bootstrap 5.x (latest) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

### Google Fonts
```html
<!-- Poppins + Roboto -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

## 🔐 Security Considerations

### Why Local is Better for Security:
✅ No data sent to third parties
✅ No tracking scripts
✅ Full control over resources
✅ No CDN vulnerabilities
✅ GDPR/privacy compliant by default

### Why External May Be Needed:
⚠️ Bot protection (reCAPTCHA)
⚠️ Analytics for business insights
⚠️ OAuth social login
⚠️ CDN for better performance

## 🌐 Self-Hosted Alternatives

### Analytics
- **Matomo** - https://matomo.org/ (self-hosted)
- **Plausible** - https://plausible.io/ (self-hosted option)
- **Umami** - https://umami.is/ (open-source)

### CAPTCHA
- **hCaptcha** - https://www.hcaptcha.com/ (privacy-focused)
- **mTCaptcha** - https://www.mtcaptcha.com/ (self-hosted option)
- **Simple CAPTCHA** - Build your own with canvas

### Fonts
- **Google Fonts Downloaded** - Use google-webfonts-helper
- **System Fonts** - Use font stack: `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`

## 📊 Performance Comparison

### Local Files
✅ No external requests
✅ Faster initial load (once cached)
✅ Works offline
❌ Larger initial download
❌ No shared cache across sites

### CDN Files
✅ Shared cache benefit
✅ Geographic distribution
✅ Automatic updates
❌ External dependency
❌ Privacy concerns
❌ Potential blocking

## 🎯 Recommended Setup

### Development (Local)
- Use local files for full control
- No external dependencies
- Easy debugging
- Privacy-friendly

### Production (Hybrid)
- Use CDN for libraries (jQuery, Bootstrap)
- Local files for custom code
- Self-hosted analytics
- Optional: reCAPTCHA for security

## 📝 Migration Path

### From Local to External:

1. **Update config.json**
```json
{
  "externalServices": {
    "cdn": { "enabled": true }
  }
}
```

2. **Update HTML**
```html
<!-- Replace local with CDN -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```

3. **Test thoroughly**
- Check all functionality
- Test in multiple browsers
- Verify analytics working

### From External to Local:

1. **Download all resources**
```bash
# Download jQuery
curl -o js/jquery.min.js https://code.jquery.com/jquery-3.4.1.min.js

# Download Font Awesome
curl -o css/fontawesome.min.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css
```

2. **Update HTML references**
```html
<!-- Use local paths -->
<link href="css/fontawesome.min.css" rel="stylesheet"/>
<script src="js/jquery.min.js"></script>
```

3. **Update config.json**
```json
{
  "externalServices": {
    "cdn": { "enabled": false }
  }
}
```

## 🔄 Current Status

### ✅ Fully Local (No External Services)
- All CSS files local
- All JS files local
- All images local
- All links local
- No tracking
- No third-party services

### 🔧 Ready to Add
- Configure via `config.json`
- Enable per service
- Test individually
- Mix and match as needed

---

**Your application is now 100% local and modular. Add external services only when you need them!** 🚀
