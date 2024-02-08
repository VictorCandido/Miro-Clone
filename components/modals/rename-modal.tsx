'use client';

import { useRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const RenameModal = () => {
    const { isOpen, onClose, initialValues } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);
    const { mutate, pending } = useApiMutation(api.board.update);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await mutate({ id: initialValues.id, title });
            toast.success('Board title updated');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update board title');
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={'outline'}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={pending}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RenameModal;