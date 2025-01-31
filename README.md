# Aurora - Mood-Based Spotify Song Recommendation

Aurora is a Next.js-powered app designed to match your mood with the perfect songs. Whether you're feeling energetic, nostalgic, relaxed, or inspired, Aurora curates a personalized playlist just for you.

## ✨ Features

- **Select Your Mood** – Choose from a variety of moods that match your feelings.
- **Discover Songs** – Let Aurora generate the best songs from Spotify based on your selection.
- **Create Playlists** – Save your favorite tracks as a playlist directly to your Spotify account.

## 🚀 Tech Stack

- **Next.js** – React framework for a seamless web experience.
- **Tailwind CSS** – Utility-first CSS framework for fast and responsive design.
- **ShadCN/UI** – Beautiful, accessible, and customizable UI components.
- **Framer Motion** – Smooth and interactive animations.
- **Spotify API** – Fetch and manage music data.
- **Zustand** – State management for a lightweight and efficient store.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GoktugYalcin/aurora.git
   cd aurora
   ```
2. Install dependencies:
   ```bash
   pnpm install  # or yarn install
   ```
3. Set up environment variables:
   Create a `.env.local` file and add your Spotify API credentials:
   ```env
   SPOTIFY_CLIENT_ID=your-client-id
   SPOTIFY_CLIENT_SECRET=your-client-secret
   SPOTIFY_REDIRECT_URI=/api/auth/callback/spotify
   SPOTIFY_AUTHORIZATION_URL=authorization url from spotify
   
   NEXTAUTH_URL=your base url
   NEXTAUTH_SECRET='you can create with openssl command'
   ```

## 🛠 Usage

1. Start the development server:
   ```bash
   pnpm run dev  # or yarn dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️
