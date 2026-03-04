import { Navigate, useLocation } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  // 1️⃣ Allow auth page for unauthenticated users
  if (!authenticated && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  // 2️⃣ If logged in and trying to access auth page
  if (authenticated && location.pathname === "/auth") {
    return user?.role === "instructor"
      ? <Navigate to="/instructor" replace />
      : <Navigate to="/home" replace />;
  }

  // 3️⃣ Instructor accessing student routes
  if (
    authenticated && user?.role === "instructor" && 
    !location.pathname.startsWith("/instructor") 
  ) {
    return <Navigate to="/instructor" replace />;
  }

  // 4️⃣ Student accessing instructor routes
  if (
    authenticated &&
    user?.role === "student" &&
    location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/home" replace />;
  }

  return element;
}

export default RouteGuard;



// import { Navigate, useLocation } from "react-router-dom";
// import { Fragment } from "react";


// function RouteGuard({ authenticated, user, element }) {
//   const location = useLocation();
//   console.log(authenticated, user, "useruser");
//   if (!authenticated && !location.pathname.includes("/auth")) {
//     return <Navigate to="/auth" />;
//   }

//   if (
//     authenticated &&
//     user?.role !== "instructor" &&
//     (location.pathname.includes("instructor") ||
//       location.pathname.includes("/auth"))
//   ) {
//     return <Navigate to="/home" />;
//   }
  
//    if (
//     authenticated &&
//     user?.role === "instructor" &&
//     !location.pathname.includes("instructor")
//   ) {
//     console.log("instructor route")
//     console.log(user.role)
//     return <Navigate to="/instructor" />;
//   }

//   // ✅ Allow the route
//   return <Fragment> {element}</Fragment> ;
// }

// export default RouteGuard;
