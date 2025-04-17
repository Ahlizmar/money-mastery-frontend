# Money Mastery – Frontend

This is the React Native frontend for the Money Mastery mobile application. It connects to the backend API and provides a gamified, mobile-first experience for budgeting, financial insights, crypto challenges, and rewards.

## Features

- Login and registration
- Dashboard with personalized smart tips
- Animated budget progress bar with visual alerts
- Crypto savings challenge and BTC conversion
- XP ring and badge rewards system
- Real-time finance news feed

## Backend URL

https://money-mastery-backend.onrender.com

All fetch requests are directed to this domain.

## Screens Implemented

- OnboardingScreen – login/register interface
- DashboardScreen – main interface with all cards
- BudgetScreen – set category limits and track usage
- CryptoChallengeScreen – BTC goal tracker

## Installation

1. Clone the repository:
git clone https://github.com/your-username/money-mastery-frontend.git
cd money-mastery-frontend

2. Install dependencies:
npm install

3. Start the Expo app:
npx expo start

Use Expo Go to scan the QR code, or press `i` (iOS) or `a` (Android) in the terminal to open the app in a simulator.

## Project Structure

/components
  /cards               → Dashboard card components
  /gamification        → XP ring visual
/screens
  OnboardingScreen.js
  DashboardScreen.js
  BudgetScreen.js
  CryptoChallengeScreen.js
/styles
  typography.js
  colors.js
  layout.js

## Configuration

All fetch requests expect the backend at:
https://money-mastery-backend.onrender.com

If testing locally, change fetch URLs in the following components:
- SmartTipsCard.js
- BudgetOverviewCard.js
- OnboardingScreen.js
- FinanceNewsCard.js

## Demo Account

You can log in using:

Email: test2@example.com  
Password: test123

## Notes

- Ensure your backend is deployed before running the app
- OpenAI tips and crypto challenge require a working backend and active environment variables
- If budget or insights fail, check your backend `/status` and `/insights` routes

## License

This project is used for academic purposes for the Software Engineering 1 course at Florida International University.
