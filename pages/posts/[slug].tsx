import fs from "fs";
import matter from "gray-matter";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import CustomLink from "@/components/CustomLink";
import InnerWorkingsTerminal from "@/components/InnerWorkingsTerminal";
import CustomCode from "@/components/CustomCode";
import Layout from "@/components/Layout";
import LottieRenderer from "@/components/LottieRenderer";
import InnerWorkingsDirectory from "@/components/InnerWorkingsDirectory";
import { postFilePaths, POSTS_PATH } from "@/utils/mdxUtils";

const components = {
  a: CustomLink,
  code: CustomCode,
  TestComponent: dynamic(() => import("@/components/TestComponent")),
  Head,
  LottieRenderer,
  InnerWorkingsTerminal,
  InnerWorkingsDirectory,
};

interface PostPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    description: string;
  };
}

export default function PostPage({ source, frontMatter }: PostPageProps) {
  return (
    <Layout>
      <header>
        <nav className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center text-gray-500 transition-colors duration-150 ease-in font-merriweather hover:text-gray-800">
              <ArrowNarrowLeftIcon className="inline w-4 h-4 mr-2" /> Go back
            </a>
          </Link>
          <div
            className="flex items-center justify-center rounded-full shadow-md"
            style={{ height: "85px", width: "85px" }}
          >
            <Image src="/logo.svg" alt="logo" height={75} width={75} />
          </div>
        </nav>
      </header>
      <div className="mt-16">
        <h1 className="text-gray-800">{frontMatter.title}</h1>
        <span className="block w-10 h-2 mt-6 bg-orange-600" />
        {frontMatter.description && (
          <p className="mt-5 text-lg text-gray-600">
            {frontMatter.description}
          </p>
        )}
        <span className="block w-full border-b border-gray-300 my-14" />
      </div>

      <main className="relative mb-16 text-gray-700 article-content">
        <MDXRemote {...source} components={components as any} />
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
