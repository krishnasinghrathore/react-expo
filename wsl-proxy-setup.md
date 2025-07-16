# WSL Corporate Proxy Setup Guide

## 🌐 Network Access Solutions

### Quick Start
```bash
# Use our custom script
./start-dev.sh

# Or manually start with IP info
npm run dev
```

### Access URLs to Try (in order of preference):
1. **WSL IP**: `http://172.30.0.2:3000`
2. **Localhost**: `http://localhost:3000`
3. **127.0.0.1**: `http://127.0.0.1:3000`
4. **0.0.0.0**: `http://0.0.0.0:3000`

## 🔧 Corporate Proxy Configuration

### 1. Set Environment Variables
```bash
# Add to ~/.bashrc or ~/.zshrc
export HTTP_PROXY=http://your-proxy-server:port
export HTTPS_PROXY=http://your-proxy-server:port
export NO_PROXY=localhost,127.0.0.1,172.30.0.2,*.local
```

### 2. NPM Proxy Configuration
```bash
npm config set proxy http://your-proxy-server:port
npm config set https-proxy http://your-proxy-server:port
npm config set registry https://registry.npmjs.org/
```

### 3. Git Proxy Configuration
```bash
git config --global http.proxy http://your-proxy-server:port
git config --global https.proxy http://your-proxy-server:port
```

## 🔥 Windows Firewall Solutions

### Option A: Allow Node.js through Windows Firewall
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find Node.js and allow both Private and Public

### Option B: Create Firewall Rule for Port 3000
```cmd
# Run in Windows PowerShell as Administrator
netsh advfirewall firewall add rule name="WSL Dev Server" dir=in action=allow protocol=TCP localport=3000
```

## 🚀 Advanced WSL Networking

### 1. Port Forwarding (if needed)
```cmd
# In Windows PowerShell as Administrator
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.30.0.2
```

### 2. Check WSL Version
```bash
wsl --version
```

### 3. WSL2 Network Configuration
```bash
# Get WSL2 IP dynamically
WSL_IP=$(ip route | grep default | awk '{print $3}')
echo "WSL Gateway IP: $WSL_IP"
```

## 🐛 Troubleshooting

### Common Issues:
1. **"Connection refused"**: Check if server is running
2. **"Timeout"**: Proxy or firewall blocking
3. **"404 Not Found"**: Wrong URL or path

### Debug Commands:
```bash
# Check if port is open
curl -I http://172.30.0.2:3000

# Check network connectivity
ping 172.30.0.2

# Check listening ports
netstat -an | grep 3000 # if available
```

### Corporate Network Bypass:
```bash
# Use alternative ports if 3000 is blocked
export PORT=8080
npm run dev
```

## 📱 Browser Testing

### Test in Multiple Browsers:
- Chrome: `http://172.30.0.2:3000`
- Firefox: `http://172.30.0.2:3000`
- Edge: `http://172.30.0.2:3000`

### Browser Extensions:
- Disable ad blockers
- Check proxy settings
- Clear cache and cookies

## 🎯 Final Tips

1. **Use WSL IP** instead of localhost for remote access
2. **Configure NO_PROXY** for local development
3. **Allow Node.js** through Windows Firewall
4. **Use our start-dev.sh script** for easy startup
5. **Check corporate IT policies** for blocked ports

---

🚀 **Quick Start Command:**
```bash
./start-dev.sh
```

Then access: `http://172.30.0.2:3000`