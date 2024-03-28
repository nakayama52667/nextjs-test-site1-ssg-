import { getBlogDetail, getBlogList } from '@/lib/client'
import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout';
import styled from "styled-components";
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticProps(context: any) {
  const params = context.params;
  const blogDetails: any = await getBlogDetail(params.id)

  // 全てのブログを取得しタイトルとidを表示。ページャで使用。
  const blogList = await getBlogList()
  // 現在の記事のインデックスを取得
  const currentIndex = blogList.contents.findIndex((content: any) => content.id === params.id);

  // 前後の記事のIDを取得
  const nextId = currentIndex > 0 ? blogList.contents[currentIndex - 1].id : null;
  const prevId = currentIndex < blogList.contents.length - 1 ? blogList.contents[currentIndex + 1].id : null;

  // 前後の記事のデータを取得
  const nextData = nextId ? await getBlogDetail(nextId) : null;
  const prevData = prevId ? await getBlogDetail(prevId) : null;
  return {
    props: {
      blogDetails,
      nextData,
      prevData
    }
  };
}
export async function getStaticPaths() {
  const blogList = await getBlogList();
  const paths = blogList.contents.map((blog: any) => ({
    params: { id: blog.id },
  }))
  return {
    paths,
    fallback: false // 404を返す
  }
}

const BlogContent = styled.div`
width: 90%;
max-width: 1000px;
margin: 0 auto;

h1 {
  font-size: 2rem;
  padding-top: 60px;
}
.category {
  margin-top: 20px;
}
.date {
  margin-top: 20px;
}
.line {
  background-color: #f2f5f3;
  height: 1px;
  margin: 50px 0;
}
.body {

}
`

const SectionPrevNextStyle = styled.section`
margin-top: 100px;
.box.prev {
  float: left;
}

.box.next {
  float: right;
}

&:after {
  clear: both;
  content: "";
  display: block;
}

.inner {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}

.box {
  width: 50%;
  min-height: 100px;
  padding: 10px 10px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    background-color: #f2f2f2;
  }

  .p {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  .boxImg {
    width: 30%;
    height: 100%;
  
    img {
      display: block;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .textBox {
    width: 70%;
    padding: 0 10px;

    .title {
      font-size: 20px;
    }
    .body {
      margin-top: 10px;
    }
  }
}

`


function Post({ blogDetails, prevData, nextData }: any) {

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month}.${day}`;
  }
  const formattedDate = formatDate(blogDetails.createdAt)
  return (
    <>
      <Head>
        <title>{blogDetails.title}</title>
        <meta name="description" content={`microcmsでディスクリプション用のスキーマを作成してコードを埋め込んでも良いですし、本文から抜粋もあり`} />
      </Head>
      <Layout>
        <main>
          <BlogContent>
            <h1 className='title'>{blogDetails.title}</h1>
            <p className='category'>カテゴリー：{blogDetails.category.name}</p>
            <p className="date">
              {formattedDate}
            </p>
            <div className="line"></div>
            <div className='body' dangerouslySetInnerHTML={{ __html: `${blogDetails.content}` }} />
          </BlogContent>

          <SectionPrevNextStyle>
            <div className="inner">

              {prevData &&
                <Link href={`/allposts/${prevData.id}`} className="box prev">
                  <p className='p'>前の記事</p>
                  <div className="boxImg">
                    {prevData.eyecatch ? <Image src={prevData.eyecatch.url} width={500} height={0} alt="" /> : <Image src="/img/defaultimage.jpg" width={500} height={0} alt="" />}
                  </div>
                  <div className="textBox">
                    <p className="title">{prevData.title}</p>
                    <p className="body">
                      {prevData.content.replace(/<[^>]*>/g, '').length > 35 ? prevData.content.replace(/<[^>]*>/g, '').slice(0, 35) + "..." : prevData.content.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                </Link>
              }

              {nextData &&
                <Link href={`/allposts/${nextData.id}`} className="box next">
                  <p className='p'>次の記事</p>
                  <div className="boxImg">
                    {nextData.eyecatch ? <Image src={nextData.eyecatch.url} width={500} height={0} alt="" /> : <Image src="/img/defaultimage.jpg" width={500} height={0} alt="" />}
                  </div>
                  <div className="textBox">
                    <p className="title">{nextData.title}</p>
                    <p className="body">
                      {nextData.content.replace(/<[^>]*>/g, '').length > 35 ? nextData.content.replace(/<[^>]*>/g, '').slice(0, 35) + "..." : nextData.content.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                </Link>
              }

            </div>
          </SectionPrevNextStyle>
        </main>
      </Layout>
    </>
  )
}

export default Post



