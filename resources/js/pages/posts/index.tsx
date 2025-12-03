import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import PostType from '@/models/post';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: "/posts",
    },
];

export default function Posts({posts}: {posts: PostType[]}) {

    const {flash} = usePage<{flash: {message?: string} }>().props;

    const onSearchChange = useRef(

    )
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        handleSearch(query);
    }

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message, {
                id: flash.message
            });
        }
    }, [flash.message]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='rounded border p-6 shadow-xl'>
                    <div className={"flex items-center justify-between"}>
                        <div className="relative w-full sm:w-1/3">
                            <Input onChange={onSearchChange} className="peer ps-9" id={'search'} placeholder="Search..." type="search" />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Search aria-hidden="true" size={16} />
                            </div>
                        </div>

                        <Button>
                            <Link href={"/posts/create"} prefetch>
                                Create Post
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {post.image && (
                                                    <img
                                                        src={`/storage/${post.image}`}
                                                        alt={post.title}
                                                        className="h-10 w-10 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {post.title.substring(20, 0)}
                                            </TableCell>
                                            <TableCell>
                                                {post.content.substring(50, 0)}
                                            </TableCell>
                                            <TableCell>
                                                {post.category}
                                            </TableCell>
                                            <TableCell>
                                                {post.status == '0' ? (<Badge className={"bg-red-500"}>Inactive</Badge>) : (<Badge className={"bg-green-500"}>Active</Badge>)}
                                            </TableCell>
                                            <TableCell className={"space-x-1.5"}>
                                                <Button asChild size={"sm"}>
                                                    <Link href={`/posts/${post.id}/edit`} prefetch>
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button size={"sm"} variant={"destructive"}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}
