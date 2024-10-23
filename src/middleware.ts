import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks:{
        authorized:({token,req}: {token: any, req: any})=>{
                if(req.nextUrl.pathname.startsWith("/admin")){
                    return token?.role==='admin'
                }else{
                    return true;
                }
            }
        }
    }
);



export const config={
    matcher:["/admin(/.*)?"],
}