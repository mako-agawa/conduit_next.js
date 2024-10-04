"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ArticleForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {  // 型アノテーションを削除
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
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
      console.error("Error submitting article:", error);
    } finally {
      setLoading(false);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-4 border border-gray-300 rounded shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            name="body"
            placeholder="Article Body"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div>
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="user_id"
            placeholder="User ID は 1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-blue-600'
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}