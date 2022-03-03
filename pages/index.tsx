import fs from "fs";
import Image from "next/image";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import Layout from "../components/Layout";
import { titleCase } from "title-case";

import { postFilePaths, POSTS_PATH } from "@/utils/mdxUtils";
import LottieData from "@/data/export";
import LottieRenderer from "@/components/LottieRenderer";
import lottieData from "@/data/export";

interface post {
  content: string;
  data: {
    title: string;
    lottieData: keyof typeof lottieData;
    published: boolean;
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
          <div
            className="flex items-center justify-center rounded-full shadow-md"
            style={{ height: "85px", width: "85px" }}
          >
            <Image src="/logo.svg" alt="logo" height={75} width={75} />
          </div>
        </nav>
      </header>
      <main className="mt-10 mb-16">
        <ul className="mt-10">
          {posts
            .filter((post) => post.data.published === true)
            .map((post, index) => (
              <li key={post.filePath} className="py-4">
                <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                  href={`/posts/[slug]`}
                >
                  <a className="block p-8 mt-4 text-2xl font-semibold text-gray-800 transition-colors duration-200 ease-in bg-gray-100 rounded-2xl group hover:bg-gray-200 hover:bg-opacity-30">
                    <div className="flex">
                      {index % 2 === 0 ? (
                        <div className="flex items-center">
                          <SideA data={LottieData[post.data.lottieData]} />
                          <SideBorder />
                          <SideB title={post.data.title} />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <SideB title={post.data.title} />
                          <SideBorder />
                          <SideA data={LottieData[post.data.lottieData]} />
                        </div>
                      )}
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

const SideBorder = () => (
  <span className="w-2 h-16 mx-8 transition-colors duration-200 ease-in border-l-2 border-orange-200 group-hover:border-orange-600"></span>
);

const SideA = ({ data = {} }) => (
  <div className="w-1/2 pr-8">
    <LottieRenderer padding="m-12" data={data} />
  </div>
);

const SideB = ({ title = "" }) => (
  <div className="flex items-center w-1/2">
    <h3 className="text-5xl leading-normal font-merriweather">
      {titleCase(title)}
      <span className="text-orange-200 transition-colors duration-200 ease-in group-hover:text-orange-600">
        .
      </span>
    </h3>
  </div>
);

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
