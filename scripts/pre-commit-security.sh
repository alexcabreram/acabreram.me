#!/usr/bin/env bash
# Pre-commit security scan — prevents leaking secrets, IPs, tokens
# Install: cp scripts/pre-commit-security.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

STAGED=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED" ]; then
  exit 0
fi

FAILED=0

echo -e "${YELLOW}🔒 Security scan — checking staged files...${NC}"

# Private IPs (RFC 1918) — skip binary files and this script itself
PRIVATE_IPS=$(echo "$STAGED" | grep -v '\.png$\|\.jpg$\|\.ico$\|\.woff2\?$\|pre-commit' | \
  xargs -I{} git show "::{}" 2>/dev/null | \
  grep -nE '192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(1[6-9]|2[0-9]|3[01])\.' || true)

if [ -n "$PRIVATE_IPS" ]; then
  echo -e "${RED}❌ Private IPs found in staged files:${NC}"
  echo "$PRIVATE_IPS" | head -10
  FAILED=1
fi

# API keys / tokens patterns
SECRETS=$(echo "$STAGED" | grep -v '\.png$\|\.jpg$\|\.ico$\|\.woff2\?$\|pre-commit' | \
  xargs -I{} git show "::{}" 2>/dev/null | \
  grep -nEi 'sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{36}|AKIA[A-Z0-9]{16}|Bearer [a-zA-Z0-9_.~+/-]+=*' || true)

if [ -n "$SECRETS" ]; then
  echo -e "${RED}❌ Potential secrets/tokens found:${NC}"
  echo "$SECRETS" | head -10
  FAILED=1
fi

# Internal ports that shouldn't be public
PORTS=$(echo "$STAGED" | grep -v '\.png$\|\.jpg$\|\.ico$\|\.woff2\?$\|pre-commit\|\.md$' | \
  xargs -I{} git show "::{}" 2>/dev/null | \
  grep -nE ':(11434|18789|2375|3003|8899|9090|9093|3000|81)[^0-9]' || true)

if [ -n "$PORTS" ]; then
  echo -e "${RED}❌ Internal service ports found:${NC}"
  echo "$PORTS" | head -10
  FAILED=1
fi

# .env files being committed
ENV_FILES=$(echo "$STAGED" | grep -E '\.env$|\.env\.' || true)
if [ -n "$ENV_FILES" ]; then
  echo -e "${RED}❌ .env files staged for commit:${NC}"
  echo "$ENV_FILES"
  FAILED=1
fi

# Source maps in dist
SOURCEMAPS=$(echo "$STAGED" | grep -E '\.map$' || true)
if [ -n "$SOURCEMAPS" ]; then
  echo -e "${YELLOW}⚠️  Source maps staged (consider excluding):${NC}"
  echo "$SOURCEMAPS"
fi

if [ "$FAILED" -eq 1 ]; then
  echo -e "\n${RED}🚫 Commit blocked — fix security issues above.${NC}"
  echo -e "To bypass (emergency only): git commit --no-verify"
  exit 1
fi

echo -e "${GREEN}✅ Security scan passed — no issues found.${NC}"
exit 0
