#!/bin/bash

# WSL Development Server Starter
echo "🚀 Starting development server for WSL environment..."
echo "📍 Current working directory: $(pwd)"

# Start the development server
echo "⚡ Starting Vite development server..."
echo ""
echo "📱 Access your application at:"
echo "   • Localhost:  http://localhost:3000 (from Windows)"
echo "   • 127.0.0.1:  http://127.0.0.1:3000 (from WSL)"
echo ""
echo "💡 Server binds to 127.0.0.1 for WSL-Windows compatibility"
echo "🔧 Using existing netsh configuration for port forwarding"
echo ""

# Start the server
npm run dev