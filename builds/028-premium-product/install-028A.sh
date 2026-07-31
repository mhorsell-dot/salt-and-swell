#!/bin/bash
set -e

echo "==========================================="
echo "BUILD 028A"
echo "PREMIUM PRODUCT EXPERIENCE"
echo "==========================================="

echo ""
echo "Installing dependencies..."

npm install framer-motion react-use embla-carousel-react

echo ""
echo "Creating component folders..."

mkdir -p components/product
mkdir -p components/product/gallery
mkdir -p components/product/mobile
mkdir -p components/product/trust
mkdir -p components/product/hooks

echo ""
echo "028A Foundation Complete"
