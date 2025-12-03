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
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/posts');
    }

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
                        <form onSubmit={handleFormSubmit}>
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div className={'col-span-2'}>
                                    <Label htmlFor={'title'}>Title</Label>
                                    <Input
                                        type={'text'}
                                        placeholder={'Title'}
                                        id={'title'}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        aria-invalid={!!errors.title}
                                    />
                                    <InputError message={errors.title}/>
                                </div>
                                <div className={'col-span-2 md:col-span-1'}>
                                    <Label htmlFor={'category'}>Category</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) =>
                                            setData('category', value)
                                        }
                                    >
                                        <SelectTrigger
                                            id="category"
                                            className="w-full"
                                            aria-invalid={!!errors.category}
                                        >
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="marvel">
                                                Marvel
                                            </SelectItem>
                                            <SelectItem value="dc">
                                                DC
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category}/>
                                </div>
                                <div className={'col-span-2 md:col-span-1'}>
                                    <Label htmlFor={'status'}>Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value)
                                        }
                                    >
                                        <SelectTrigger
                                            id={'status'}
                                            className={'w-full'}
                                            aria-invalid={!!errors.status}
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
                                    <InputError message={errors.status}/>
                                </div>
                                <div className={'col-span-2'}>
                                    <Label htmlFor={'content'}>Title</Label>
                                    <Textarea
                                        rows={6}
                                        id={'content'}
                                        placeholder={'Type content here...'}
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        aria-invalid={!!errors.content}
                                    />
                                    <InputError message={errors.content}/>
                                </div>
                                <div className={'col-span-2'}>
                                    <Label htmlFor={'image'}>
                                        Select Image
                                    </Label>
                                    <Input
                                        type={'file'}
                                        id={'image'}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('image', file);
                                            }
                                        }}
                                        aria-invalid={!!errors.image}
                                    />
                                    <InputError message={errors.image}/>
                                    {data.image &&
                                        <img src={URL.createObjectURL(data.image)} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-lg" />
                                    }
                                </div>
                            </div>
                            <div className={'mt-4 text-end'}>
                                <Button type={'submit'} disabled={processing} size={"lg"}>
                                    {processing && <Loader2 className={"animate-spin"} />}
                                    Create Post
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
