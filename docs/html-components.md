# HTML Component Analysis

## Document Structure

### Meta Information
```html
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
<meta name="csrf-token" content="sN4AoQNhJCIz55fhcQcrR0o5heGm64b35vbhJrbI"/>
<meta name="robots" content="noindex"/>
```

**Key Points:**
- UTF-8 character encoding
- Mobile-responsive viewport
- CSRF token for security
- No indexing by search engines

### External Resources

#### Fonts
```html
<link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&family=Roboto:400,500,700" rel="stylesheet"/>
```

#### Stylesheets
1. Font Awesome: `https://elev8tion.agiled.app/plugins/fontawesome/css/all.css`
2. Theme (Default): `https://elev8tion.agiled.app/stylesheets/theme.min.css`
3. Theme (Dark): `https://elev8tion.agiled.app/stylesheets/theme-dark.min.css`
4. Custom: `https://elev8tion.agiled.app/stylesheets/custom.css`
5. Local: `style.css`

#### JavaScript Libraries
1. jQuery: `https://elev8tion.agiled.app/plugins/jquery/jquery.min.js`
2. Popper.js: `https://elev8tion.agiled.app/plugins/bootstrap/js/popper.min.js`
3. Bootstrap: `https://elev8tion.agiled.app/plugins/bootstrap/js/bootstrap.min.js`
4. Theme: `https://elev8tion.agiled.app/js/theme.min.js`
5. Helper: `https://elev8tion.agiled.app/plugins/agiled-helper/helper.js`

### Theme System

```javascript
var skin = localStorage.getItem('skin') || 'default';
var isCompact = JSON.parse(localStorage.getItem('hasCompactMenu'));
var disabledSkinStylesheet = document.querySelector('link[data-skin]:not([data-skin="' + skin + '"])');
disabledSkinStylesheet.setAttribute('rel', '');
disabledSkinStylesheet.setAttribute('disabled', true);
if (isCompact == true) document.querySelector('html').classList.add('preparing-compact-menu');
```

**Features:**
- LocalStorage-based theme persistence
- Dynamic stylesheet switching
- Compact menu option
- Immediate theme application (no FOUC)

## Main Components

### 1. Authentication Form

```html
<main class="auth auth auth-floated">
  <form action="https://elev8tion.agiled.app/login" class="auth-form" id="loginform" method="POST">
    <!-- Form content -->
  </form>
</main>
```

**Classes:**
- `auth` - Main authentication container
- `auth-floated` - Floating/centered layout style
- `auth-form` - Form styling

### 2. Logo Section

```html
<div class="mb-4">
  <div class="mb-3 login-logo-background" style="background:">
    <img class="rounded ff" height="70" src="https://elev8tion.agiled.app/agiled-logo-color.png"/>
  </div>
  <h1 class="h3">Sign In</h1>
</div>
```

**Elements:**
- Logo image (70px height)
- "Sign In" heading (h3 size)
- Customizable background

### 3. Signup Prompt

```html
<p class="text-left mb-4">
  Don't have an account?
  <a href="https://my.agiled.app/signup">Create One</a>
</p>
```

### 4. Email Input

```html
<div class="form-group mb-4">
  <label class="d-block text-left" for="inputUser">Email</label>
  <input
    autofocus=""
    class="form-control form-control-lg"
    id="email"
    name="email"
    required=""
    type="email"
    value=""
  />
</div>
```

**Attributes:**
- `autofocus` - Focus on page load
- `required` - HTML5 validation
- `type="email"` - Email validation
- `form-control-lg` - Large input size

### 5. Password Input

```html
<div class="form-group mb-4">
  <label class="d-block text-left" for="password">Password</label>
  <input
    class="form-control form-control-lg"
    id="password"
    name="password"
    placeholder="Password"
    required=""
    type="password"
  />
</div>
```

### 6. Submit Button

```html
<div class="form-group mb-4">
  <button class="btn btn-lg btn-primary btn-block" id="save-form" type="submit">
    Log In
  </button>
</div>
```

**Classes:**
- `btn-lg` - Large button
- `btn-primary` - Primary color scheme
- `btn-block` - Full width

### 7. Remember Me Checkbox

```html
<div class="form-group text-center">
  <div class="custom-control custom-control-inline custom-checkbox">
    <input class="custom-control-input" id="remember-me" name="remember" type="checkbox"/>
    <label class="custom-control-label" for="remember-me">Remember Me</label>
  </div>
</div>
```

### 8. Password Recovery

```html
<p class="py-2">
  <a class="link" href="https://elev8tion.agiled.app/password/reset">Forgot Password?</a>
</p>
```

### 9. Footer

```html
<p class="mb-0 px-3 text-muted text-center">
  <footer class="auth-footer">
    2025 &copy;
    <a href="https://agiled.app/privacy-policy/">Privacy</a>
    and
    <a href="https://agiled.app/terms-of-service/">Terms</a>
  </footer>
</p>
```

### 10. Announcement Panel

```html
<div class="auth-announcement" id="announcement"
     style="background-image: url(https://elev8tion.agiled.app/images/login_background.jpeg">
  <div class="announcement-body">
    <h2 class="announcement-title">Start Managing Your Business Smartly</h2>
    <a class="btn btn-warning" href="signup">
      <i class="fa fa-fw fa-angle-right"></i>
      Signup Today
    </a>
  </div>
</div>
```

**Features:**
- Background image
- Call-to-action heading
- Warning button (yellow/orange)
- Icon integration

## Analytics Integration

### Google Tag Manager

```javascript
(function(w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-WXNKTSB');
```

**Container ID:** GTM-WXNKTSB

### NoScript Fallback

```html
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WXNKTSB"
          height="0" width="0"
          style="display:none;visibility:hidden">
  </iframe>
</noscript>
```

## Security Features

### reCAPTCHA
```html
<script src="https://www.google.com/recaptcha/api.js"></script>
```

### CSRF Token
```html
<input autocomplete="off" name="_token" type="hidden"
       value="sN4AoQNhJCIz55fhcQcrR0o5heGm64b35vbhJrbI"/>
```

## CSS Class Patterns

### Spacing Utilities
- `mb-4` - Margin bottom 4
- `mb-3` - Margin bottom 3
- `py-2` - Padding Y-axis 2
- `px-3` - Padding X-axis 3

### Text Utilities
- `text-left` - Left aligned text
- `text-center` - Center aligned text
- `text-muted` - Muted/gray text

### Display Utilities
- `d-block` - Display block
- `custom-control-inline` - Inline custom control

### Component Classes
- `form-control` - Input styling
- `form-control-lg` - Large form control
- `form-group` - Form group container
- `btn` - Button base
- `btn-lg` - Large button
- `btn-primary` - Primary button color
- `btn-warning` - Warning button color
- `btn-block` - Full-width button
- `rounded` - Rounded corners

## Responsive Design

The page uses Bootstrap's responsive grid system and utilities:
- Mobile-first approach
- Viewport meta tag
- Responsive images
- Flexible containers
