"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeleteButton from '../../components/DeleteButton';

export default function ArticleDetail({ params }) {
  const { id } = params;  // ルーティングのidパラメータを取得
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
          throw new Error(`Error fetching article: ${res.statusText}`);
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  return (
    <div className="bg-slate-50 flex justify-center p-12">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-green-500 font-bold">{article.user_id}: Test User</h1>
        <h1 className="text-3xl font-bold my-4">{article.title}</h1>
        <p className="text-xl mb-4 text-gray-600">{article.subtitle}</p>
        <p className="text-lg leading-8 mb-8 text-gray-700">{article.body}</p>
        <div className="flex justify-between items-center py-4 border-t border-gray-200">
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">{article.tag}</span>
          <div className="flex space-x-4">
            <button onClick={() => router.back()} className="text-green-500 border border-green-500 hover:underline rounded-md py-2 px-6">
              Back
            </button>
            <button
              onClick={() => router.push(`/articles/${article.id}/edit`)}  // 編集ページへのルーティング
              className="bg-yellow-500 text-white hover:bg-yellow-600 rounded-md py-2 px-7"
            >
              Edit
            </button>
            <button onClick={() => router.back()} className="text-blue-500 hover:underline">
              <DeleteButton id={article.id} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}