export default defineNuxtRouteMiddleware(async () => {
    const jwt = useCookie("NoteNestJWT");

    if (jwt.value) {
        return navigateTo("/");
    }
});
