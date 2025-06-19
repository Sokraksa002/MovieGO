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
    poster_path: string;
    backdrop_path?: string;
    vote_average?: number;
    rating?: number;
    genres?: Genre[];
    created_at?: string;
    updated_at?: string;
}

export interface Movie extends BaseMedia {
    title: string;
    overview?: string;
    description?: string;
    release_date: string;
    duration?: number;
    runtime?: number;
    trailer_url?: string;
    streaming_url?: string;
    type?: 'movie';
}

export interface TVShow extends BaseMedia {
    name: string;
    overview?: string;
    description?: string;
    first_air_date: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    status?: string;
    original_language?: string;
    type?: 'tv';
    streaming_url?: string;
    trailer_url?: string;
}

// Page-specific props
export interface HomePageProps extends PageProps {
    featuredMovies?: Movie[];
    popularMovies?: Movie[];
    latestMovies?: Movie[];
    popularTVShows?: TVShow[];
    trendingToday?: Movie[];
}

export interface StreamingPageProps extends PageProps {
    movie: Movie | TVShow;
    isTV?: boolean;
}

export interface MovieDetailPageProps extends PageProps {
    id: string;
    movie?: Movie;
}

export interface TVShowDetailPageProps extends PageProps {
    id: string;
    tvShow?: TVShow;
}
