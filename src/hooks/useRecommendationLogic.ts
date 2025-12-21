/**
 * useRecommendationLogic Hook
 * 
 * This hook is designed to be the integration point for the Python ML backend.
 * Currently uses mock data, but can be easily connected to a Flask/FastAPI endpoint.
 * 
 * To connect to your Python backend:
 * 1. Replace the mock functions with fetch calls to your API
 * 2. Update the API_BASE_URL constant
 * 3. Adjust the response types as needed
 */

import { useState, useCallback } from 'react';

// Types for the recommendation system
export interface Movie {
  id: number;
  title: string;
  genres: string[];
  rating: number;
  posterUrl: string;
  year: number;
  overview: string;
}

export interface Recommendation extends Movie {
  score: number;
  reason: string;
}

export type RecommendationStrategy = 'content-based' | 'collaborative' | 'hybrid';

export interface SystemStats {
  rmse: number;
  totalMovies: number;
  activeUsers: number;
  totalRatings: number;
}

export interface RatingDistribution {
  rating: number;
  count: number;
}

// Mock movie data
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genres: ["Drama", "Crime"],
    rating: 4.8,
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    year: 1994,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 2,
    title: "The Dark Knight",
    genres: ["Action", "Crime", "Drama"],
    rating: 4.7,
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 3,
    title: "Inception",
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: 4.6,
    posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    year: 2010,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genres: ["Crime", "Drama"],
    rating: 4.5,
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    year: 1994,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: 5,
    title: "The Matrix",
    genres: ["Action", "Sci-Fi"],
    rating: 4.5,
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    year: 1999,
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  },
  {
    id: 6,
    title: "Interstellar",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    rating: 4.6,
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: 2014,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 7,
    title: "Fight Club",
    genres: ["Drama", "Thriller"],
    rating: 4.4,
    posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    year: 1999,
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more."
  },
  {
    id: 8,
    title: "Goodfellas",
    genres: ["Biography", "Crime", "Drama"],
    rating: 4.4,
    posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    year: 1990,
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners."
  },
  {
    id: 9,
    title: "The Prestige",
    genres: ["Drama", "Mystery", "Sci-Fi"],
    rating: 4.3,
    posterUrl: "https://image.tmdb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
    year: 2006,
    overview: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other."
  },
  {
    id: 10,
    title: "Parasite",
    genres: ["Comedy", "Drama", "Thriller"],
    rating: 4.5,
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    year: 2019,
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
  },
];

// Mock system stats
const mockStats: SystemStats = {
  rmse: 0.94,
  totalMovies: 9742,
  activeUsers: 610,
  totalRatings: 100836,
};

// Mock rating distribution
const mockRatingDistribution: RatingDistribution[] = [
  { rating: 1, count: 1892 },
  { rating: 2, count: 4532 },
  { rating: 3, count: 18762 },
  { rating: 4, count: 35429 },
  { rating: 5, count: 40221 },
];

// Generate mock recommendations based on strategy
const generateRecommendations = (
  targetMovie: Movie | null,
  userId: number,
  strategy: RecommendationStrategy
): Recommendation[] => {
  const shuffled = [...mockMovies].sort(() => Math.random() - 0.5);
  const filtered = targetMovie 
    ? shuffled.filter(m => m.id !== targetMovie.id)
    : shuffled;

  return filtered.slice(0, 6).map((movie, index) => {
    let reason = '';
    const score = 0.95 - (index * 0.05);

    switch (strategy) {
      case 'content-based':
        reason = targetMovie
          ? `Similar genres to "${targetMovie.title}" (${movie.genres.join(', ')})`
          : `Matches your preference for ${movie.genres[0]} films`;
        break;
      case 'collaborative':
        reason = `Users similar to you (ID: ${userId}) rated this ${movie.rating}/5`;
        break;
      case 'hybrid':
        reason = targetMovie
          ? `Combines genre similarity with "${targetMovie.title}" and collaborative patterns from similar users`
          : `Best match using both content analysis and user behavior patterns`;
        break;
    }

    return {
      ...movie,
      score,
      reason,
    };
  });
};

// API configuration - Update this when connecting to your Python backend
// const API_BASE_URL = 'http://localhost:5000/api';

export const useRecommendationLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = useCallback(async (
    targetMovie: Movie | null,
    userId: number,
    strategy: RecommendationStrategy
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/recommendations`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ movieId: targetMovie?.id, userId, strategy }),
      // });
      // const data = await response.json();
      // setRecommendations(data.recommendations);

      const mockRecommendations = generateRecommendations(targetMovie, userId, strategy);
      setRecommendations(mockRecommendations);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStats = useCallback((): SystemStats => {
    // TODO: Replace with API call
    return mockStats;
  }, []);

  const getRatingDistribution = useCallback((): RatingDistribution[] => {
    // TODO: Replace with API call
    return mockRatingDistribution;
  }, []);

  const searchMovies = useCallback((query: string): Movie[] => {
    // TODO: Replace with API call
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations,
    getStats,
    getRatingDistribution,
    searchMovies,
    allMovies: mockMovies,
  };
};
