#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🛑 Stopping server on port 8080...${NC}"

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    lsof -ti:8080 | xargs kill -9
    echo -e "${GREEN}✅ Server stopped successfully!${NC}"
else
    echo -e "${YELLOW}ℹ️  No server running on port 8080${NC}"
fi
