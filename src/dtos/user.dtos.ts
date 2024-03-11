

export type UserLoginDTO = {
    username?: string,
    email?: string,
    password: string
}

export type UserLoggedInDTO = {
    username: string,
    email: string,
    jwtToken: string,
    jwtExpiresAt: Date
}