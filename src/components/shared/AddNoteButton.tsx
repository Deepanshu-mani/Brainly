import { useState } from "react";
import { Button } from "../../ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { NoteEditor } from "./NoteEditor";
import { useNotes } from "../../hooks/useNotes";

export function AddNoteButton() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { createNote } = useNotes();

  const handleSave = async (data: { title: string; content: string }) => {
    try {
      await createNote({
        title: data.title,
        content: data.content,
        tags: [],
      });
      setIsEditorOpen(false);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      {isEditorOpen ? (
        <div className="w-80 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-gray-200 dark:border-dark-border">
          <NoteEditor
            onSave={handleSave}
            onCancel={() => setIsEditorOpen(false)}
          />
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={() => setIsEditorOpen(true)}
          className="!rounded-full !w-14 !h-14 !p-0 flex items-center justify-center shadow-lg"
        >
          <PlusIcon className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
