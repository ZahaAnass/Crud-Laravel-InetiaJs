import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Posts',
        href: '/posts/create',
    },
];

export default function Posts() {
    const { data, setData, post, errors, processing } = useForm<{
        title: string;
        category: string;
        status: string;
        content: string;
        image: File | null;
    }>({
        title: '',
        category: '',
        status: '',
        content: '',
        image: null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded border p-6 shadow-xl">
                    <div className={'flex items-center justify-between'}>
                        <div className="text-xl text-slate-400">
                            Create Post
                        </div>

                        <Button>
                            <Link href={'/posts'} prefetch>
                                Go Back
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <form>
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div className={'col-span-2'}>
                                    <Label htmlFor={'title'}>Title</Label>
                                    <Input
                                        type={'text'}
                                        placeholder={'Title'}
                                        id={'title'}
                                    />
                                </div>
                                <div className={'col-span-2 md:col-span-1'}>
                                    <Label htmlFor={'category'}>Category</Label>
                                    <Select>
                                        <SelectTrigger
                                            id="category"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Light">
                                                Light
                                            </SelectItem>
                                            <SelectItem value="Dark">
                                                Dark
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className={'col-span-2 md:col-span-1'}>
                                    <Label htmlFor={'status'}>Status</Label>
                                    <Select>
                                        <SelectTrigger
                                            id={'status'}
                                            className={'w-full'}
                                        >
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">
                                                Published
                                            </SelectItem>
                                            <SelectItem value="0">
                                                Inactive
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className={'col-span-2'}>
                                    <Label htmlFor={'content'}>Title</Label>
                                    <Textarea
                                        rows={6}
                                        id={'content'}
                                        placeholder={'Type content here...'}
                                    />
                                </div>
                                <div className={'col-span-2'}>
                                    <Label htmlFor={'image'}>
                                        Select Image
                                    </Label>
                                    <Input type={'file'} id={'image'} />
                                </div>
                            </div>
                            <div className={'mt-4 text-end'}>
                                <Button type={'submit'}>Create Post</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
