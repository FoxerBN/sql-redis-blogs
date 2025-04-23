export interface ArticleQuery {
    author?: string;
    title?: string;
    tags?: string;  // očakávame CSV string, napr. "js,node,redis"
  }