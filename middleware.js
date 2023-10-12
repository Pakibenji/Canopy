export { default } from "next-auth/middleware";


export const config = { matcher: ["/dashboard/:path*", "/plants/add", "/plant/[id]/edit/:path*"] };