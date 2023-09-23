import "globals.css";
import { Metadata } from "next"
import React from "react"
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programmers diary',
}

export default async function Page() {
  const articleData = await fetch("http://localhost:8081/posts", { method: "GET", next: { revalidate: 10 }})
    .then((response) => response.json());
  console.log(articleData);
  const articles = articleData.map(article =>
    <li key={article.id}>
      <Link href={"/post/" + article.id}>
        <h2>{article.title}</h2>
        <p>{article.author}</p>
      </Link>
    </li>
  );
  return (
    <div>
      <div>
        <Link href="/post/create">Create a new post</Link>
      </div>
      <div>
        <h1 className="ring-2 md:ring-4 dark:text-white">Articles</h1>
        <ul>{articles}</ul>
      </div>
    </div>
  );
}