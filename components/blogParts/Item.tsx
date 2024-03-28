import Image from 'next/image';
import Link from 'next/link';
import styled from "styled-components";

type blogProps = {
  blog: {
    id: string,
    title: string,
    content: string,
    category: { id: string, name: string },
    eyecatch: { url: string }
  }
}

const ItemStyle = styled.li`
list-style: none;

&.w32{
  width: 32%;
  @media screen and (max-width: 1000px) {
    width: 48%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
}


.link {
  display: flex;
  flex-direction: column;
  gap: 10px 0;

  &:hover {
    img {
      transform: scale(1.1);
      transition: transform 0.2s ease 0s;
    }
  }
}

.ImgBox {
  height: 150px;
  overflow: hidden;
  position: relative;

  .category {
    background-color: #6A61FF;
    color: white;
    padding: 4px 7px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.ImgBox img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease 0s;
}
.title {
  font-size: 1.4rem;
  padding: 0 6px;
}
.body {
  padding: 0 6px;
}

`
const Item = ({ blog }: blogProps) => {
  const strippedContent = blog.content.replace(/<[^>]*>/g, ''); // HTMLタグを削除
  return (
    <ItemStyle className='w32'>
      <Link href={`/allposts/${blog.id}`} className="link">
        <div className="ImgBox">
          {blog.eyecatch && blog.eyecatch.url ? <Image src={blog.eyecatch.url} width={500} height={0} alt="" /> : <Image src="/img/defaultimage.jpg" width={500} height={0} alt="" />}
          <p className='category'>{blog.category.name}</p>
        </div>
        <h2 className="title">{blog.title}</h2>
        <div className='body' dangerouslySetInnerHTML={{ __html: `${strippedContent.length > 65 ? strippedContent.toString().slice(0, 65) + "..." : strippedContent}` }} />
      </Link>
    </ItemStyle>
  )
}

export default Item