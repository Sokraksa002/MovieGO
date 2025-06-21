import { type PageProps } from '@inertiajs/core';
import { ReactNode } from 'react';

export interface BreadcrumbItem {
    title: string;
    href: string;
    active?: boolean;
}

export interface NavItem {
    title: string;
    href: string;
    icon: ReactNode;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar?: string;
    is_admin?: boolean;
}

export interface SharedData extends PageProps {
    auth: {
        user: User;
    };
}

// Media related types
export interface Genre {
    id: number;
    name: string;
}

export interface BaseMedia {
    id: number;
    poster_path?: string;    // For external API compatibility
    poster_url?: string;     // Database field name
    backdrop_path?: string;  // For external API compatibility
    backdrop_url?: string;   // Database field name
    vote_average?: number;
    rating?: string | number;  // Database stores as string
    genres?: Genre[];
    created_at?: string;
    updated_at?: string;
    // TMDB fields
    tmdb_id?: number;
    imdb_id?: string;
    tmdb_poster_path?: string;
    tmdb_backdrop_path?: string;
    tmdb_vote_average?: number;
    tmdb_vote_count?: number;
    tmdb_popularity?: number;
    tmdb_original_language?: string;
    tmdb_adult?: boolean;
}

export interface Movie extends BaseMedia {
    title: string;
    overview?: string;
    description?: string;
    year?: string;           // Database field name
    release_date?: string;   // For external API compatibility
    duration?: number;       // Database field name
    runtime?: number;        // Legacy compatibility
    trailer_url?: string;
    streaming_url?: string;
    type?: 'movie' | 'tv_show';  // Updated to include tv_show
    poster_url?: string;     // Database field name
    backdrop_url?: string;   // Database field name
}

export interface TVShow extends BaseMedia {
    name: string;
    title?: string; // Some APIs use title, some use name
    overview?: string;
    description?: string;
    first_air_date: string;
    number_of_seasons?: number;
    seasons_count?: number;  // Alternative field name
    number_of_episodes?: number;
    episodes_count?: number; // Alternative field name
    status?: string;
    original_language?: string;
    type?: 'tv' | 'tv_show';
    streaming_url?: string;
    trailer_url?: string;
}

// Page-specific props
export interface HomePageProps extends PageProps {
    featuredMovies?: Movie[];
    popularMovies?: Movie[];
    latestMovies?: Movie[];
    popularTVShows?: TVShow[];
    allMovies?: Movie[];
    error?: string;
}

export interface StreamingPageProps extends PageProps {
    movie: Movie | TVShow;
    isTV?: boolean;
}

export interface MovieDetailPageProps extends PageProps {
    id: string;
    movie?: Movie;
    error?: string;
}

export interface TVShowDetailPageProps extends PageProps {
    id: string;
    tvShow?: TVShow;
    error?: string;
}

export interface PopularPageProps extends PageProps {
    popularMovies: Movie[];
    genres: Genre[];
    error?: string;
}

export interface LatestPageProps extends PageProps {
    latestMovies: Movie[];
    genres: Genre[];
    error?: string;
}

export interface GenrePageProps extends PageProps {
    genres: Genre[];
    movies: Movie[];
    tvShows: TVShow[];
    allMedia: (Movie | TVShow)[];
    currentGenre?: Genre;
    error?: string;
}

export interface WatchHistoryItem {
    media: Movie | TVShow;
    progress: number;
    duration: number;
    watched_at: string;
}

export interface ProfilePageProps extends PageProps {
    favorites: (Movie | TVShow)[];
    watchlist: (Movie | TVShow)[];
    watchHistory: WatchHistoryItem[];
    error?: string;
}
