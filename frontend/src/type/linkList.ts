export type Links = {
    pathText: string
    path: string
}

export type linkList = {
    id: 'hub' | 'todo' | 'food'
    appName: string
    homePath: string
    links: Links[]
}
