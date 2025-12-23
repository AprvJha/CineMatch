import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TMDB_API_KEY = Deno.env.get("TMDB_API_KEY");
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MoviePoster {
  id: number;
  title: string;
  posterUrl: string | null;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { movieIds } = await req.json();

    if (!Array.isArray(movieIds) || movieIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "movieIds array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Limit to 20 movies per request to avoid rate limiting
    const idsToFetch = movieIds.slice(0, 20);

    console.log(`Fetching posters for ${idsToFetch.length} movies`);

    const results: MoviePoster[] = await Promise.all(
      idsToFetch.map(async (id: number) => {
        try {
          const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
          );

          if (!response.ok) {
            console.log(`Movie ${id} not found in TMDB`);
            return { id, title: "", posterUrl: null };
          }

          const data = await response.json();
          return {
            id,
            title: data.title || "",
            posterUrl: data.poster_path
              ? `${TMDB_IMAGE_BASE}${data.poster_path}`
              : null,
          };
        } catch (error) {
          console.error(`Error fetching movie ${id}:`, error);
          return { id, title: "", posterUrl: null };
        }
      })
    );

    return new Response(JSON.stringify({ posters: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in tmdb-poster function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
