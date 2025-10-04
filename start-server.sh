#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Navigate to script directory
cd "$(dirname "$0")"

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                  ║${NC}"
echo -e "${BLUE}║           STARTING LOCAL APPLICATION SERVER                      ║${NC}"
echo -e "${BLUE}║                                                                  ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if port 8080 is already in use
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port 8080 is already in use!${NC}"
    echo ""
    echo "Stopping existing server..."
    lsof -ti:8080 | xargs kill -9 2>/dev/null
    sleep 1
fi

# Start server
echo -e "${GREEN}✅ Starting Python HTTP server on port 8080...${NC}"
python3 -m http.server 8080 > /tmp/server.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Check if server started successfully
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${GREEN}✅ Server started successfully!${NC}"
    echo ""
    echo -e "${BLUE}📄 Application URL:${NC}"
    echo -e "   ${GREEN}http://localhost:8080/index-local.html${NC}"
    echo ""
    echo -e "${BLUE}📊 Server Log:${NC}"
    echo -e "   ${GREEN}/tmp/server.log${NC}"
    echo ""
    echo -e "${BLUE}🛑 Stop Server:${NC}"
    echo -e "   ${GREEN}lsof -ti:8080 | xargs kill -9${NC}"
    echo ""
    
    # Open browser
    echo -e "${GREEN}🌐 Opening browser...${NC}"
    open http://localhost:8080/index-local.html
    
    echo ""
    echo -e "${GREEN}✨ Server is running! Press Ctrl+C to view logs (server continues in background)${NC}"
    echo ""
    
    # Tail logs
    tail -f /tmp/server.log
else
    echo -e "${YELLOW}❌ Failed to start server!${NC}"
    exit 1
fi
