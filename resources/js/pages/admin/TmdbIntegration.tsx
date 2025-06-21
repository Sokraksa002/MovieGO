import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { type PageProps } from '@inertiajs/core';
import { MagnifyingGlassIcon, LinkIcon, CheckIcon } from '@heroicons/react/24/outline';
import AdminLayout from '../../layouts/admin/AdminLayout';
import axios from '../../utils/axios';

interface Media {
    id: number;
    title: string;
    type: 'movie' | 'tv_show';
    tmdb_id?: number;
    poster_url?: string;
    year?: string;
    release_date?: string;
}

interface TmdbResult {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
    media_type?: string;
    vote_average: number;
}

interface TmdbIntegrationProps extends PageProps {
    media: Media[];
}

const TmdbIntegration: React.FC = () => {
    const { media } = usePage<TmdbIntegrationProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<TmdbResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isLinking, setIsLinking] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const unlinkedMedia = media?.filter(m => !m.tmdb_id) || [];

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setSearchResults([]);

        try {
            const response = await axios.get('/api/tmdb/search', {
                params: { query: searchQuery, type: 'multi' }
            });

            if (response.data && response.data.results) {
                setSearchResults(response.data.results);
            }
        } catch (error) {
            setErrorMessage('Failed to search TMDB');
            console.error('TMDB search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleLinkMedia = async (tmdbId: number) => {
        if (!selectedMedia) return;

        setIsLinking(true);

        try {
            // Use Inertia router for proper CSRF handling
            router.patch(`/admin/media/${selectedMedia.id}/link-tmdb`, {
                tmdb_id: tmdbId
            }, {
                onSuccess: () => {
                    setSuccessMessage(`Successfully linked "${selectedMedia.title}" to TMDB`);
                    setSelectedMedia(null);
                    setSearchResults([]);
                    setSearchQuery('');
                    // Refresh the page data
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Link errors:', errors);
                    setErrorMessage('Failed to link media to TMDB');
                },
                onFinish: () => {
                    setIsLinking(false);
                }
            });
        } catch (error) {
            setErrorMessage('Failed to link media to TMDB');
            console.error('Link error:', error);
            setIsLinking(false);
        }
    };

    const clearMessages = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(clearMessages, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    return (
        <AdminLayout title="TMDB Integration">
            <div className="space-y-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">TMDB Integration</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Link your media entries to TMDB for enhanced metadata and streaming capabilities.
                        </p>
                    </div>
                </div>

                {/* Status Messages */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        <div className="flex">
                            <CheckIcon className="h-5 w-5 text-green-400" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{successMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Media without TMDB IDs */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Media Without TMDB Links ({unlinkedMedia.length})
                        </h3>

                        {unlinkedMedia.length === 0 ? (
                            <p className="text-gray-500">All media entries are linked to TMDB!</p>
                        ) : (
                            <div className="grid gap-4">
                                {unlinkedMedia.map((mediaItem) => (
                                    <div
                                        key={mediaItem.id}
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                            selectedMedia?.id === mediaItem.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedMedia(mediaItem)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            {mediaItem.poster_url && (
                                                <img
                                                    src={mediaItem.poster_url}
                                                    alt={mediaItem.title}
                                                    className="w-12 h-16 object-cover rounded"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{mediaItem.title}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {mediaItem.type === 'movie' ? 'Movie' : 'TV Show'} • 
                                                    {mediaItem.year || mediaItem.release_date}
                                                </p>
                                            </div>
                                            {selectedMedia?.id === mediaItem.id && (
                                                <CheckIcon className="h-5 w-5 text-blue-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* TMDB Search */}
                {selectedMedia && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Search TMDB for: "{selectedMedia.title}"
                            </h3>

                            <div className="flex space-x-4 mb-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="Search TMDB..."
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearching || !searchQuery.trim()}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                                >
                                    <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                                    {isSearching ? 'Searching...' : 'Search'}
                                </button>
                            </div>

                            {/* Search Results */}
                            {searchResults.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Search Results</h4>
                                    <div className="grid gap-4">
                                        {searchResults.map((result) => (
                                            <div
                                                key={result.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    {result.poster_path && (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                                                            alt={result.title || result.name}
                                                            className="w-12 h-16 object-cover rounded"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-gray-900">
                                                            {result.title || result.name}
                                                        </h5>
                                                        <p className="text-sm text-gray-500">
                                                            {result.media_type || 'unknown'} • 
                                                            {result.release_date || result.first_air_date} • 
                                                            ⭐ {result.vote_average.toFixed(1)}
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                            {result.overview}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleLinkMedia(result.id)}
                                                        disabled={isLinking}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-200"
                                                    >
                                                        <LinkIcon className="h-4 w-4 mr-1" />
                                                        {isLinking ? 'Linking...' : 'Link'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default TmdbIntegration;
