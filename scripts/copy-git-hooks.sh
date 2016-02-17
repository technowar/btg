#!/bin/sh

BOLD=$(tput bold)
ATTENTION=$(tput setab 1)
NORMAL=$(tput sgr0)

if [ -d .git/hooks ]; then
  if [ -f scripts/git-hooks/pre-commit ]; then
    printf "%sCopying pre-commit hook%s" "${BOLD}" "${NORMAL}"
    if [ -f .git/hooks/pre-commit ]; then
      DIFF=$(diff .git/hooks/pre-commit scripts/git-hooks/pre-commit)
      if [ "$DIFF" != "" ]; then
	cp scripts/git-hooks/pre-commit .git/hooks/
	printf "\n\n%s%sExiting. The pre-commit hook has changed and has been updated. Please try to commit again.%s" "${BOLD}" "${ATTENTION}" "${NORMAL}"
	echo
	exit 1
      fi
    fi
    cp scripts/git-hooks/pre-commit .git/hooks/
    chmod +x .git/hooks/pre-commit
  fi
fi
