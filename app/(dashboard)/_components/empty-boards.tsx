'use client';

import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

const EmptyBoards = () => {
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = async () => {
        try {
            if (!organization) return;

            const id = await mutate({
                orgId: organization.id,
                title: 'Untitled Board',
            });

            toast.success('Board created');
            // TODO: Redirect to board/:id
        } catch (error) {
            toast.error('Failed to create board');
        }
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={'/note.svg'}
                alt="Empty"
                height={110}
                width={110}
            />

            <h2 className="text-2xl font-semibold mt-6">
                Create your firt board!
            </h2>

            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>

            <div className="mt-6">
                <Button
                    disabled={pending}
                    size={'lg'}
                    onClick={onClick}
                >
                    Create Board
                </Button>
            </div>
        </div>
    );
}

export default EmptyBoards;