# MovieFlix

A modern, responsive React application for browsing movies and TV shows using The Movie Database (TMDB) API. Built with TypeScript and Vite.

## Features

- **Browse Movies & TV Shows**: Discover popular movies and TV shows with detailed information.
- **Pagination**: Load more content seamlessly with "Load More" buttons.
- **Collection Translations**: View movie collections with translations in multiple languages.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Real API Integration**: Uses TMDB API v3 with Bearer authentication for live data.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **API Client**: Axios
- **Mocking**: MSW (Mock Service Worker) for development
- **Styling**: CSS Modules
- **Routing**: React Router
- **Testing**: Vitest

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MovieFlix-React.git
   cd MovieFlix-React-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your TMDB API credentials:
   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_BASE_URL=https://api.themoviedb.org/3
   VITE_ACCESS_TOKEN=your_tmdb_access_token_here
   ```
   - Get your API key and access token from [TMDB API](https://www.themoviedb.org/settings/api).

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:3003`.

## Usage

- Navigate to the Movies or TV Shows pages to browse content.
- Click on a movie or show to view details, including collection information and translations.
- Use the "Load More" button to fetch additional items.

## Project Structure

```
src/
├── Components/
│   ├── UI/
│   │   ├── Card.tsx
│   │   ├── Image.tsx
│   │   ├── ImageLink.tsx
│   │   ├── Navbar.tsx
│   │   └── navbar.module.css
│   ├── Item.tsx
│   └── ItemsList.tsx
├── Layouts/
│   └── MainLayout.tsx
├── Mocks/
│   ├── handlers.ts
│   └── server.ts
├── Models/
│   ├── IMovie.ts
│   └── IShow.ts
├── Pages/
│   ├── HomePage.tsx
│   ├── MoviePage.tsx
│   ├── MoviesPage.tsx
│   ├── TVShowPage.tsx
│   └── TVShowsPage.tsx
├── Utilities/
│   ├── FindCollectionTranslations.ts
│   ├── FindMovie.ts
│   ├── LoadMovies.ts
│   └── LoadShows.ts
├── App.tsx
├── index.css
└── main.tsx
```

## API Integration

This app integrates with TMDB API v3. Endpoints used:
- `/discover/movie` and `/discover/tv` for listings
- `/movie/{id}` and `/tv/{id}` for details
- `/collection/{id}/translations` for collection translations

Authentication uses Bearer token for secure API access.

## Testing

Run tests with:
```bash
npm run test
```

## Build for Production

```bash
npm run build
```

## Deployment

This project is configured for deployment on Vercel.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

4. Set environment variables in Vercel dashboard:
   - `VITE_API_KEY`
   - `VITE_BASE_URL`
   - `VITE_ACCESS_TOKEN`

   Get these from [TMDB API](https://www.themoviedb.org/settings/api).

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run tests and ensure everything works.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API.
- Icons and images sourced from TMDB.
