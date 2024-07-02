
async function authenticate(user, pass) {
    try {
        const response = await fetch("/api/v1/users/login", {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "usuario":user,
                "password":pass
            }),
        });
        
        return response.ok;
    } catch (error) {
        console.error(error.message);
        return undefined;
    }
}