import { categories } from "@/contants";
import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

export const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDinamic?: boolean
) => {
  const query = gql`
  query MyQuery (
    $access_key: String!
    $categories: String!
    $keywords: String
  )
  {
    myQuery(
      access_key: $access_key
      categories: $categories
      countries: "us, pl, ua"
      sort: "published_desc"
      keywords: $keywords
      ) {
      data {
        author
        category
        country
        description
        image
        language
        published_at
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }
`;

  const res = await fetch('https://songo.stepzen.net/api/mottled-jackal/__graphql', {
    method: 'POST',
    cache: isDinamic ? 'no-cache' : 'default',
    next: isDinamic ? {revalidate: 0} : {revalidate: 20},
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      }
    })
  })

  console.log(
    "loading data from api",
    category,
    keywords
  );
  
  const newsResponse = await res.json()

  const news = sortNewsByImage(newsResponse.data.myQuery)

  return news;

};
//http://api.mediastack.com/v1/news?access_key=YOUR_ACCESS_KEY

//stepzen import curl "http://api.mediastack.com/v1/news?access_key=064314b02b66e7125970666afa114629"
