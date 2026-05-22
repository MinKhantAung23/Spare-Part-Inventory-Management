"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete the data from our servers.",
  isLoading = false,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-3xl font-padauk bg-slate-50">
        <DialogHeader className="flex flex-col items-center justify-center pt-4">
          <div className="bg-rose-100 p-3 rounded-full mb-4">
            <AlertTriangle className="text-rose-600" size={32} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500 pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-3 sm:justify-center border-t pt-6 mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl px-6 flex-1 border border-slate-200"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-rose-500 hover:bg-rose-600 text-slate-50   rounded-xl px-6 flex-1"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
