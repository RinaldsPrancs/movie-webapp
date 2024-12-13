'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


export async function fetchFilteredMovies(
  query: string,
   currentPage: number,
) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${currentPage}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`, 
          },
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const resObject = await response.json();
          return resObject.results;
        } catch (error) {
          console.error('Failed to fetch filtered movies:', error);
          throw error; 
        }
      }



      
      export async function fetchFilteredShows(
        query: string,
         currentPage: number,
      ) {
        const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=${currentPage}`;
              const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`, 
                },
              };
              try {
                const response = await fetch(url, options);
                if (!response.ok) {
                  throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
            
                const resObject = await response.json();
                return resObject.results;
              } catch (error) {
                console.error('Failed to fetch filtered movies:', error);
                throw error; 
              }
            }


      export async function fetchShowPages(
  query: string
) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`;
              
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`, 
          },
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const resObject = await response.json();
          return resObject.total_pages;
        } catch (error) {
          console.error('Failed to fetch:', error);
          throw error; 
        }
      }
