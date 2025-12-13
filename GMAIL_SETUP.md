# Gmail Integration Setup Guide

## Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Once 2FA is enabled, go back to Security
5. Search for "App passwords" or go to: https://myaccount.google.com/apppasswords
6. Click "App passwords"
7. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or Other)
8. Click **Generate**
9. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 2: Set Environment Variables

### Windows (PowerShell):
```powershell
# Set for current session
$env:GMAIL_USERNAME="mohit.kr1103@gmail.com"
$env:GMAIL_APP_PASSWORD="your-16-char-app-password"

# Set permanently (requires restart of terminal)
[System.Environment]::SetEnvironmentVariable('GMAIL_USERNAME', 'mohit.kr1103@gmail.com', 'User')
[System.Environment]::SetEnvironmentVariable('GMAIL_APP_PASSWORD', 'your-16-char-app-password', 'User')
```

### Alternative: Create .env file (NOT RECOMMENDED for production)
Create a file `.env` in the backend directory:
```
GMAIL_USERNAME=mohit.kr1103@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

**IMPORTANT**: Add `.env` to your `.gitignore` to avoid committing credentials!

## Step 3: Restart Backend Server

After setting environment variables, restart your Spring Boot backend:
1. Stop the current Java terminal (Ctrl+C)
2. Run: `mvn spring-boot:run`

## Step 4: Test the Contact Form

1. Go to your portfolio contact page
2. Fill in the form
3. Click "Send Message"
4. Check your Gmail inbox - you should receive the message!

## Troubleshooting

### "Authentication failed" error:
- Ensure 2-Step Verification is enabled
- Regenerate App Password
- Check environment variables are set correctly
- Restart terminal and backend after setting variables

### "Connection timeout" error:
- Check firewall settings (allow port 587)
- Try using port 465 instead (change in application.properties)

### Email not received:
- Check spam folder
- Verify GMAIL_USERNAME matches the recipient email
- Check backend console for error messages

## Security Notes

1. **Never commit** App Password to Git
2. Use environment variables for production
3. For deployment, use server environment variables or secrets management
4. App Passwords are specific to apps - revoke if compromised

## Email Format

You will receive emails with:
- **Subject**: "Portfolio Contact Form: Message from [Name]"
- **From**: Your Gmail address
- **Reply-To**: Sender's email (so you can reply directly)
- **Body**: Name, Email, and Message content
