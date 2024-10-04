"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditArticleForm({ params }) {
  const { id } = params;  // URLからidを取得
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);  // API呼び出しにidを使用
        if (!res.ok) {
          throw new Error(`Error fetching article: ${res.statusText}`);
        }
        const data = await res.json();
        setArticle(data);
        setInitialLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setInitialLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: e.target.title.value,
          subtitle: e.target.subtitle.value,
          body: e.target.body.value,
          tag: e.target.tag.value,
          user_id: e.target.user_id.value,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setLoading(false);
      router.push(`/articles/${id}`);  // 記事詳細ページに戻る
    }
  };

  if (initialLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-4 border border-gray-300 rounded shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={article?.title || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            defaultValue={article?.subtitle || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            name="body"
            placeholder="Article Body"
            defaultValue={article?.body || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div>
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            defaultValue={article?.tag || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="user_id"
            placeholder="User ID"
            defaultValue={article?.user_id || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}