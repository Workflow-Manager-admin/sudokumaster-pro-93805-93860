#!/bin/bash
cd /home/kavia/workspace/code-generation/sudokumaster-pro-93805-93860/sudokumaster_pro
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

