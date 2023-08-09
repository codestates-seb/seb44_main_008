export interface PostItemType {
  post: {
    title: string;
    movieId: number;
    review: string;
    tags: { tagId: number; tagName: string }[];
  };
  thumbnail: File | undefined;
}

export interface EditItemType {
  reviewId: string | undefined;
  patch: {
    title: string | undefined;
    review: string;
    tags: Object[];
  };
  thumbnail: File | undefined;
}

export interface ReviewType {
  recommendBoards: {
    reviewBoardId: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
    };
  }[];
  popularBoards: {
    reviewBoardId: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
    };
  }[];
  boards: {
    reviewBoardId: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
    };
  }[];
}

export interface PageType {
  data: [
    {
      createdAt: string;
      reviewBoardId: number;
      thumbnail: string;
      title: string;
      user: {
        nickname: string;
        userId: number;
      };
    },
  ];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface AllItemType {
  data: [
    {
      createdAt: string;
      reviewBoardId: number;
      thumbnail: string;
      title: string;
      user: {
        nickname: string;
        userId: number;
      };
    },
  ];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface TagSearchResultType {
  data: {
    tagName: string;
    boards: [
      {
        createdAt: string;
        reviewBoardId: number;
        thumbnail: string;
        title: string;
        user: {
          nickname: string;
          userId: number;
        };
      },
    ];
  };
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface KeywordSearchResultType {
  data: {
    createdAt: string;
    reviewBoardId: number;
    thumbnail: string;
    title: string;
    user: {
      nickname: string;
      userId: number;
    };
  }[];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}
