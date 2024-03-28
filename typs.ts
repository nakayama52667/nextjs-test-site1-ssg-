export type blogList = {
  blogList: {
    contents: {
      title: string,
      id: string
    }[]
  }
}

export type blogDetails = {
  blogDetails: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    category: {
      name: string;
      id: string
    }
  },
}