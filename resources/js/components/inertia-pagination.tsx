import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface LinksType {
    url: string;
    label: string;
    active: boolean;
}

interface PostType {
    links: LinksType[];
    from: number;
    to: number;
    total: number;
}

function InertiaPagination({posts}: {posts: PostType}) {
    return (
        <div
            className={
                'mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between'
            }
        >
            <div>
                {/*{posts.from} - {posts.to} of {posts.total}*/}
                {posts.total >= 1 ? (
                    <span>Showing {posts.from} to {posts.to} of {posts.total} results</span>
                    ) : (
                        <span>No results found</span>
                    )
                }
            </div>
            <div className={"flex flex-wrap items-center justify-center gap-2"}>
                {posts.links.map((link, index) => {

                    const isDisabled = !link.url;

                    if(isDisabled) {
                        return (
                            <Button key={index} variant={"outline"} disabled
                            className={"pointer-events-none opacity-50"}
                            dangerouslySetInnerHTML={{ __html: link.label }}/>
                        )
                    }

                    return (
                        <Button key={index} asChild variant={link.active ? "default" : "outline"}>
                            <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                    )

                })}
            </div>
        </div>
    );
}

export default InertiaPagination;
