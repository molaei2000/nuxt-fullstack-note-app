export default defineNuxtRouteMiddleware(async () => {
    if (import.meta.client) return;

    const jwt = useCookie("NoteNestJWT");

    if (jwt.value) {
        return navigateTo("/");
    }
});
