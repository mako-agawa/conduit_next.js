// "use client"
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function Home() {
//   const [articles, setArticles] = useState([]);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const router = useRouter();

//   // const handleNavigate = (id) => {
//   //   router.push(`/articles/${id}`);
//   // };

//   // クライアントサイドでデータを取得
//   useEffect(() => {
//     const fetchArticles = async () => {
//       const res = await fetch(`${API_URL}`);
//       const data = await res.json();
//       console.log(data);
//       setArticles(data);
//     };

//     fetchArticles();
//   }, []);



//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <div className="home-page">
//         <div className="banner">
//           <div className="bg-green-500">
//             <h1 className="text-8xl font-bold text-white text-center p-12">conduit</h1>
//             <p className="text-3xl pb-4 text-white text-center">A place to share your knowledge.</p>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-center py-8">
//           <Link
//             href="/articles/new"
//             className="text-3xl font-bold py-4 px-8 mb-8 text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300"
//           >
//             Create New Article!!
//           </Link>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
//             {articles.map((article) => (
//               <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                 <Link href={`/articles/${article.id}`}>
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <a href="#" className="text-green-500 font-bold">{article.user_id}. Test User</a>
//                     <span className="text-gray-500 text-sm">{article.create_at}</span>
//                   </div>
//                   <h1 className="text-2xl font-bold text-gray-900">{article.title}</h1>
//                   <p className="text-gray-700 mb-4">{article.subtitle}</p>
//                   <p className="text-gray-600 mb-4">{article.body.substring(0, 100)}...</p>
//                   <ul className="flex space-x-2">
//                     <li className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">{article.tag}</li>
//                   </ul>
//                 </div>
//                 </Link>
//                 {/* <button
//                   onClick={() => handleNavigate(article.id)}
//                   className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//                 >
//                   Read More
//                 </button> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // クライアントサイドでデータを取得
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      console.log(data);
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleNavigate = (id) => {
    const pathname = `/articles/${id}`;  // 遷移するURLを生成
    router.push(pathname);  // router.pushでページ遷移
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="home-page">
        <div className="banner">
          <div className="bg-green-500">
            <h1 className="text-8xl font-bold text-white text-center p-12">conduit</h1>
            <p className="text-3xl pb-4 text-white text-center">A place to share your knowledge.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8">
          <Link
            href="/articles/new"
            className="text-3xl font-bold py-4 px-8 mb-8 text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300"
          >
            Create New Article!!
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            {articles.map((article) => (
              <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <a href="#" className="text-green-500 font-bold">{article.user_id}. Test User</a>
                    <span className="text-gray-500 text-sm">{article.create_at}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{article.title}</h1>
                  <p className="text-gray-700 mb-4">{article.subtitle}</p>
                  <p className="text-gray-600 mb-4">{article.body.substring(0, 100)}...</p>
                  <ul className="flex space-x-2">
                    <li className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">{article.tag}</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleNavigate(article.id)}  // クリックで遷移
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}