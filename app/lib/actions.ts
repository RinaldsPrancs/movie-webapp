'use server';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';


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


export async function createUser2(
  prevState: string | undefined,
  formData: FormData
) {
  const client = await db.connect();
  const password = formData.get('password');
  const username = formData.get('username');
  const email = formData.get('email');
  if (typeof password !== 'string') {
    throw new Error('Password is required and must be a string.');
  }
  if (typeof username !== 'string') {
    throw new Error('Username is required and must be a string.');
  }
  if (typeof email !== 'string') {
    throw new Error('Email is required and must be a string.');
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  await client.sql`
    INSERT INTO users (name, email, password)
    VALUES (${username}, ${email}, ${hashedPassword});
  `;
  }catch (error) {
    if (error instanceof Error && 'code' in error && (error as { code: string }).code === '23505') {
      // Check the constraint name to narrow down the issue
      const pgError = error as { code: string; constraint?: string };
      console.log(pgError)
      if (pgError.constraint === 'users_email_key') {
        return 'Email already exists. Please use a different email.';
      }
      if(pgError.constraint === 'users_name_key'){
        return 'Username already exists. Please use a different username.';
      }
    }
    // Fallback for other types of errors
    return 'Something went wrong.';
  }

}


export async function fetchFilteredMovies(
  query: string,
  currentPage: number,
) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${currentPage}`;
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
        const url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=${currentPage}`;
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
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`;
              
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

    
     
