export interface User{
    id:number,
    firstname:string,
    lastname:string,
    mail:string,
    student:boolean,
    admin:boolean,
}
export const userInfo : User={
    id:1234567,
    firstname:"abdel",
    lastname:"taya",
    mail:"abdel.taya@insa-lyon.fr",
    student:false,
    admin:true,
}