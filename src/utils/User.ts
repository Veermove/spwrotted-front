export interface SPWRUser {
    email: string,
    name: string,
    pwr_association: number[]
    role: number,
}

export const isUserAdimn = (usr?: SPWRUser) => usr && usr.role === 1;
