# AquaFlow
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Mahmoud-ABDALKream/AquaFlow)

AquaFlow is a sophisticated, interactive landing page for a smart water management system. It showcases an IoT-based product designed to help households and businesses monitor, control, and conserve water in real-time through a combination of hardware sensors and a mobile application.

The application features a visually rich, animated user interface with complex 3D models, smooth parallax scrolling effects, and a detailed breakdown of the product's features, impact, and technology.

## Key Features

*   **Interactive 3D Product Models:** Explore the AquaFlow device in 3D, with separate, optimized models for desktop (`aquaflow.glb`) and mobile (`aquaflow-mobile.glb`). Powered by React Three Fiber and Drei.
*   **Animated & Immersive UI:** A fluid user experience with animations powered by Framer Motion, including a custom loading screen, parallax scrolling effects, and dynamic UI elements.
*   **Comprehensive Product Showcase:** The landing page is divided into clear sections detailing the project:
    *   **Problem & Solution:** Outlines the challenges of water waste and how AquaFlow addresses them.
    *   **Features:** Details core functionalities like real-time monitoring, leak detection, and smart scheduling.
    *   **How It Works:** A step-by-step guide to installing and using the system.
    *   **Mobile App:** A showcase of the companion React Native application's screens and capabilities.
    *   **Impact:** Presents data-driven statistics on water and cost savings.
*   **Responsive Design:** A fully responsive layout that adapts to all screen sizes, with specific components and 3D models for mobile devices.
*   **Component-Based Architecture:** Built with a clean, modular structure using reusable React components and UI elements from `shadcn/ui`.

## Technology Stack

*   **Framework:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) for components.
*   **3D Rendering:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Hardware/Backend Concept:** The project is designed around an **ESP32** microcontroller and leverages **Firebase** for cloud database and authentication services.

## Project Structure

The project is organized with a clear and scalable structure:

```
src/
├── assets/         # Static assets like images
├── components/
│   ├── aqua/       # Core components for each section of the landing page
│   ├── ui/         # Reusable UI components from shadcn/ui
│   └── ...
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── public/
│   └── models/     # 3D models in .glb format
└── App.tsx         # Main application component
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js (v18 or later) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/mahmoud-abdalkream/aquaflow.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd aquaflow
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:8080`.

## Available Scripts

In the project directory, you can run the following commands:

*   `npm run dev`: Starts the development server with hot-reloading.
*   `npm run build`: Bundles the app for production into the `dist` folder.
*   `npm run lint`: Lints the source code using ESLint.
*   `npm run preview`: Serves the production build locally to preview before deployment.
