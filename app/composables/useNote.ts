import type { Note } from "@prisma/client";

export const useNote = ({
    textarea,
}: {
    textarea?: Ref<HTMLTextAreaElement | null>;
}) => {
    const selectedNote = useState<Note | null>("selected-note", () => null);
    const updatedNote = useState<string>("updated-note", () => "");
    const notes = useState<Note[] | null>("notes", () => null);

    const getNotes = async () => {
        const data = await $fetch<Note[]>("/api/notes");

        notes.value = data;
    };

    const todaysNotes = computed(() => {
        if (!notes.value) return [];
        return notes.value.filter((note) => {
            const noteDate = new Date(note.updatedAt);
            return noteDate.toDateString() === new Date().toDateString();
        });
    });

    const yesterdaysNotes = computed(() => {
        if (!notes.value) return [];

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return notes.value.filter((note) => {
            const noteDate = new Date(note.updatedAt);
            return noteDate.toDateString() === yesterday.toDateString();
        });
    });

    const earlierNotes = computed(() => {
        if (!notes.value) return [];

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return notes.value.filter((note) => {
            const noteDate = new Date(note.updatedAt);
            return (
                noteDate < yesterday &&
                noteDate.toDateString() !== yesterday.toDateString()
            );
        });
    });

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
            await getNotes();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteNote() {
        if (!notes.value) return;
        if (!selectedNote.value) return;
        // truly delete
        await $fetch(`/api/notes/${selectedNote.value.id}`, {
            method: "DELETE",
        });

        const index = notes.value.findIndex((note) => {
            return note.id === selectedNote.value?.id;
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
        notes,
        getNotes,
        setNote,
        createNewNote,
        deleteNote,
        updateNote,
        debouncedFn,
        todaysNotes,
        yesterdaysNotes,
        earlierNotes,
    };
};
