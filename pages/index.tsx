import fs from "fs";
import Image from "next/image";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import Layout from "../components/Layout";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";
import LottieData from "@/data/export";
import LottieRenderer from "@/components/LottieRenderer";
import lottieData from "@/data/export";
interface post {
  content: string;
  data: {
    title: string;
    lottieData: keyof typeof lottieData;
  };
  filePath: string;
}

export default function Index({ posts }: { posts: post[] }) {
  return (
    <Layout>
      <header>
        <nav className="flex items-center justify-between">
          <span className="text-2xl text-gray-900 font-merriweather">
            AidenBuis<span className="text-orange-600">.</span>com
          </span>
          <Image src="/logo.svg" alt="logo" height={75} width={75} />
        </nav>
      </header>
      <main className="mt-16">
        <ul>
          {posts.map((post) => (
            <li key={post.filePath}>
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                href={`/posts/[slug]`}
              >
                <a className="block p-8 mt-4 text-2xl font-semibold text-gray-800 transition-colors duration-200 ease-in bg-gray-100 border-4 border-orange-200 hover:bg-orange-50 rounded-2xl hover:border-orange-600">
                  <div className="flex">
                    <div className="w-1/2 pr-8">
                      <LottieRenderer data={LottieData[post.data.lottieData]} />
                    </div>
                    <div className="flex items-center w-1/2">
                      <h3 className="text-5xl leading-normal font-merriweather">
                        {post.data.title}
                        <span className="text-orange-600">.</span>
                      </h3>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
