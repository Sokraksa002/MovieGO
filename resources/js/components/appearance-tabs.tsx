import { useForm } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

export default function AppearanceTabs() {
    const { data, setData, patch, processing } = useForm({
        theme: 'system',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        patch(route('settings.appearance'));
    }

    return (
        <Tabs
            defaultValue="theme"
            className="w-full"
        >
            <TabsList className="grid w-full grid-cols-1 h-auto">
                <TabsTrigger value="theme">Theme</TabsTrigger>
            </TabsList>
            <TabsContent value="theme" className="p-4 border rounded-md mt-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-4">
                        <RadioGroup
                            value={data.theme}
                            onValueChange={(value: string) => setData('theme', value)}
                            className="grid grid-cols-3 gap-4"
                        >
                            <div>
                                <RadioGroupItem
                                    value="light"
                                    id="theme-light"
                                    className="sr-only"
                                />
                                <Label
                                    htmlFor="theme-light"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-gray-200 [&:has([data-state=checked])]:border-yellow-500"
                                >
                                    <div className="mb-2 rounded-md bg-white p-1 shadow-sm">
                                        <div className="space-y-2">
                                            <div className="h-2 w-[80px] rounded bg-gray-200"></div>
                                            <div className="h-2 w-[100px] rounded bg-gray-200"></div>
                                        </div>
                                    </div>
                                    <span className="block w-full text-center font-normal">
                                        Light
                                    </span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem
                                    value="dark"
                                    id="theme-dark"
                                    className="sr-only"
                                />
                                <Label
                                    htmlFor="theme-dark"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-zinc-950 p-4 hover:bg-zinc-900 hover:border-zinc-800 [&:has([data-state=checked])]:border-yellow-500"
                                >
                                    <div className="mb-2 rounded-md bg-zinc-800 p-1 shadow-sm">
                                        <div className="space-y-2">
                                            <div className="h-2 w-[80px] rounded bg-zinc-700"></div>
                                            <div className="h-2 w-[100px] rounded bg-zinc-700"></div>
                                        </div>
                                    </div>
                                    <span className="block w-full text-center font-normal text-white">
                                        Dark
                                    </span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem
                                    value="system"
                                    id="theme-system"
                                    className="sr-only"
                                />
                                <Label
                                    htmlFor="theme-system"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-r from-white to-zinc-900 p-4 hover:from-gray-100 hover:to-zinc-800 hover:border-gray-200 [&:has([data-state=checked])]:border-yellow-500"
                                >
                                    <div className="mb-2 rounded-md bg-gradient-to-r from-white to-zinc-800 p-1 shadow-sm">
                                        <div className="space-y-2">
                                            <div className="h-2 w-[80px] rounded bg-gradient-to-r from-gray-200 to-zinc-700"></div>
                                            <div className="h-2 w-[100px] rounded bg-gradient-to-r from-gray-200 to-zinc-700"></div>
                                        </div>
                                    </div>
                                    <span className="block w-full text-center font-normal bg-clip-text text-transparent bg-gradient-to-r from-black to-white">
                                        System
                                    </span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button
                        disabled={processing}
                        className="w-full sm:w-auto"
                    >
                        {processing ? 'Saving...' : 'Save changes'}
                    </Button>
                </form>
            </TabsContent>
        </Tabs>
    );
}
