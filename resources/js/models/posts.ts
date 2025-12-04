import PostType from './post';
import LinksType from './links';
export default interface PostsType {
    data: PostType[];
    links: LinksType[];
    from: number;
    to: number;
    total: number;
}
