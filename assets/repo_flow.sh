#!/usr/bin/env bash
set -euo pipefail
REMOTE="origin"
DEV_BRANCH="main"
echo "[repo_flow] Starte Workflow..."
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[repo_flow] Fehler: Kein Git-Repository."
  exit 1
fi
git checkout "$DEV_BRANCH"
git fetch "$REMOTE"
if ! git rebase "$REMOTE/$DEV_BRANCH"; then
  echo "[repo_flow] Rebase-Konflikt."
  exit 1
fi
git add -A
MSG="auto: update $(date -u +'^%Y-^%m-^%dT^%H:^%M:^%SZ')"
git commit -m "$MSG"
git push "$REMOTE" "$DEV_BRANCH"
