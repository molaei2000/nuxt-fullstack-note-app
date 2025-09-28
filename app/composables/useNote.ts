import type { Note } from "@prisma/client";

export const useNote = ({
    textarea,
}: {
    textarea?: Ref<HTMLTextAreaElement | null>;
}) => {
    const selectedNote = useState<Note | null>("selected-note", () => null);
    const updatedNote = useState("updated-note", () => "");

    function setNote(note: Note) {
        selectedNote.value = note;
        updatedNote.value = note.text;
    }

    async function createNewNote() {
        try {
            const newNote = await $fetch<Note>(`/api/notes`, {
                method: "POST",
            });

            // notes.value.unshift(newNote);
            await refreshNuxtData("notes");
            selectedNote.value = newNote;
            updatedNote.value = "";
            textarea?.value?.focus();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteNote() {
        if (!selectedNote.value) return;
        // truly delete
        await $fetch(`/api/notes/${selectedNote.value.id}`, {
            method: "DELETE",
        });

        const index = notes.value.findIndex((note) => {
            return note.id === selectedNote.value.id;
        });
        console.log(index);
        notes.value.splice(index, 1);
    }

    async function updateNote() {
        if (!selectedNote.value) return;

        try {
            await $fetch(`/api/notes/${selectedNote.value.id}`, {
                method: "PATCH",
                body: {
                    updatedNote: updatedNote.value,
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    const debouncedFn = useDebounceFn(async () => {
        await updateNote();
    }, 1000);

    return {
        selectedNote,
        setNote,
        createNewNote,
        deleteNote,
        updateNote,
        debouncedFn,
    };
};
