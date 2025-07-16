#!/bin/bash

# WSL Development Server Starter
echo "🚀 Starting development server for WSL environment..."
echo "📍 Current working directory: $(pwd)"

# Get WSL IP address
WSL_IP=$(hostname -I | cut -d' ' -f1)
echo "🌐 WSL IP Address: $WSL_IP"

# Start the development server
echo "⚡ Starting Vite development server..."
echo ""
echo "📱 Access your application at:"
echo "   • WSL IP:     http://$WSL_IP:3000"
echo "   • Localhost:  http://localhost:3000"
echo "   • 127.0.0.1:  http://127.0.0.1:3000"
echo "   • 0.0.0.0:    http://0.0.0.0:3000"
echo ""
echo "💡 If localhost doesn't work, try the WSL IP address!"
echo "🔧 For Windows host access, you may need to configure Windows Firewall"
echo ""

# Start the server
npm run dev