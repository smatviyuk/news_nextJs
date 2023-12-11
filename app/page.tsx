import { categories } from '@/contants';
import { fetchNews } from '@/lib/fetchNews';
import React from 'react';
import NewsList from './NewsList';
import response from '../response.json'

const HomePage = async () => {
  {/*response ||*/} 
const news: NewsResponse = response || await fetchNews(categories.join(",")) 
  
  return (
    <div>
      <NewsList news={news}/>
    </div>
  );
};

export default HomePage;