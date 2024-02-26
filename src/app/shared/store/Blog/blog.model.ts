export interface BlogModel{
    id: string,
    title: string,
    description:string
}

export interface blogs{
    bloglist:BlogModel[],
    Errormessage:string
}