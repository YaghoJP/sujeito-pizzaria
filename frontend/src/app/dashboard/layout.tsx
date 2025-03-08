import { Header } from "./components/header"
export default function DashBoardLayout({children}:{children: React.ReactNode}){

    return(
        <>
            <Header/>
            {children}
        </>
    )
}
