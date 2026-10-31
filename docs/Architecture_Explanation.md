# Wasteless AI: Architecture & Explanation Document

This document explains the technical architecture, design decisions, and data flow of the Wasteless AI platform.

## 1. Technical Architecture Overview

Wasteless AI utilizes a **Backend-For-Frontend (BFF)** architecture. 
- **The Frontend** operates as a true Single Page Application (SPA). There is only one HTML file (`index.html`). Navigation between pages is handled instantly via JavaScript DOM manipulation, completely eliminating page reloads and providing a seamless "app-like" experience on mobile devices.
- **The Backend** is a Python Flask server that acts purely as a RESTful JSON API. It is decoupled visually from the frontend but serves the static assets and templates to avoid cross-origin (CORS) security issues.

## 2. Security & AI Proxying

A critical requirement of this project was cybersecurity. 
If we were to make API calls to Azure AI Vision or Azure OpenAI directly from the JavaScript frontend, the secret API keys would be exposed to anyone who opens the browser's Developer Tools.

**The Solution:**
The frontend never talks to the external AI services directly. 
1. The frontend sends a secure, authenticated request (e.g., uploading an image) to our local Flask backend (`/api/action/vision`).
2. The Flask backend, safely holding the secret keys in the server environment (`.env`), executes the call to Microsoft Azure.
3. The backend receives the AI data, parses it securely, saves it to the SQLite database, and then returns a clean, sanitized JSON response back to the frontend.

## 3. Database & State Ledger

We use SQLite managed by the **SQLAlchemy ORM (Object-Relational Mapper)**.
Using an ORM inherently protects the application from **SQL Injection attacks** because it parameterizes all queries automatically before they touch the database.

The State Ledger evaluates the `days_to_expiry` integer attached to every `InventoryItem`. 
When the AI Chef is invoked, a backend query specifically filters for items where `status == 'critical'`. This fulfills the PPT requirement of "Decay-prioritized routing"—forcing the AI to drain near-spoiled ingredients before pulling from fresh stock.

## 4. Design Language

The UI abandons generic tech templates for a premium, editorial design language.
- **Color Palette:** Warm cream background, deep forest green text, and vibrant neon green accents for a tech-forward sustainability feel.
- **Typography:** `Playfair Display` (serif) is used for headers to establish luxury and trust, while `Outfit` (sans-serif) ensures data readability on dashboards.
- **Glassmorphism:** Modules utilize semi-transparent backgrounds with a CSS backdrop-blur (`backdrop-filter: blur(16px)`) over abstract floating orbs, creating physical depth on the screen.
