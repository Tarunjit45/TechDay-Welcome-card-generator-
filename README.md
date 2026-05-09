# GIMT National Technology Day • Digital Identity Pass Generator

A modern, high-tech web application developed for **Global Institute of Management & Technology (GIMT)** to celebrate **National Technology Day**. This tool allows participants to generate and download a unique, futuristic digital identity pass.

## 🚀 Features

- **Futuristic UI/UX**: Cyberpunk-inspired design with smooth animations using `motion`.
- **Identity Scan**: Integrated holographic camera scan (Webcam) with HUD overlays.
- **Photo Upload**: Fallback option to upload an existing ID photo.
- **Sector Authority Selection**: Choose your department (CSE, ECE, ME, etc.) to customize the pass blueprint.
- **High-Quality Export**: Generate and download passes as high-resolution PNG images using `html2canvas`.
- **Social Sharing**: Direct transmission links for LinkedIn, Facebook, and Instagram.
- **Print Optimization**: Dedicated styles for clean physical printing.

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion (fka Framer Motion)
- **Icons**: Lucide React
- **Capture**: html2canvas
- **Hardware Integration**: react-webcam
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment (Vercel)

This project is optimized for deployment on **Vercel**.

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project in Vercel.
3. Vercel will automatically detect the **Vite** configuration.
4. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## 📄 License

This project was developed for GIMT CSE Innovation Unit. All rights reserved.
