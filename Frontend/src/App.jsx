import React, { useContext, lazy, Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import RouteGuard from "./components/route-guard";
import { AuthContext } from "./context/auth-context";
import ErrorBoundary from "./components/error-boundary";

// ✅ Lazy Loaded Pages
const AuthPage = lazy(() => import("./pages/auth"));
const InstructorDashboardpage = lazy(() =>
  import("./pages/instructor/instructorDashboard")
);
const AddNewCoursePage = lazy(() =>
  import("./pages/instructor/add-new-coursepage")
);
const StudentViewCommonLayout = lazy(() =>
  import("./components/student-view/common-layout")
);

const App = () => {
  const { auth } = useContext(AuthContext);

  const guardProps = useMemo(
    () => ({
      authenticated: auth?.authenticate,
      user: auth?.user,
    }),
    [auth]
  );

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Auth */}
          <Route
            path="/auth"
            element={
              <ErrorBoundary>
                <RouteGuard element={<AuthPage />} {...guardProps} />
              </ErrorBoundary>
            }
          />

          {/* Instructor Dashboard */}
          <Route
            path="/instructor"
            element={
              <ErrorBoundary>
                <RouteGuard
                  element={<InstructorDashboardpage />}
                  {...guardProps}
                />
              </ErrorBoundary>
            }
          />

          {/* Create Course */}
          <Route
            path="/instructor/create-new-course"
            element={
              <ErrorBoundary>
                <RouteGuard element={<AddNewCoursePage />} {...guardProps} />
              </ErrorBoundary>
            }
          />

          {/* Edit Course */}
          <Route
            path="/instructor/edit-course/:courseId"
            element={
              <ErrorBoundary>
                <RouteGuard element={<AddNewCoursePage />} {...guardProps} />
              </ErrorBoundary>
            }
          />

          {/* Student Home */}
          <Route
            path="/home"
            element={
              <ErrorBoundary>
                <RouteGuard
                  element={<StudentViewCommonLayout />}
                  {...guardProps}
                />
              </ErrorBoundary>
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <RouteGuard
                  element={<StudentViewCommonLayout />}
                  {...guardProps}
                />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;


// import React, { useContext } from "react";
// import { Routes, Route } from "react-router-dom";
// import AuthPage from "./pages/auth";
// import RouteGuard from "./components/route-guard";
// import { AuthContext } from "./context/auth-context";
// import InstructorDashboardpage from "./pages/instructor/instructorDashboard";
// import AddNewCoursePage from "./pages/instructor/add-new-coursepage";
// import Home from "./pages/student/home";
// import StudentViewCommonLayout from "./components/student-view/common-layout";

// const App = () => {
//   const { auth} = useContext(AuthContext);

//   return (
//     <Routes>
//       <Route
//         path="/auth"
//         element={
//           <RouteGuard
//             element={<AuthPage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor"
//         element={
//           <RouteGuard
//             element={<InstructorDashboardpage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor/create-new-course"
//         element={
//           <RouteGuard
//             element={<AddNewCoursePage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//        <Route
//         path="/instructor/edit-course/:courseId"
//         element={
//           <RouteGuard
//             element={<AddNewCoursePage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/home"
//         element={
//           <RouteGuard
//             element={<StudentViewCommonLayout />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/"
//         element={
//           <RouteGuard
//             element={<StudentViewCommonLayout />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//     </Routes>
//   );
// };

// export default App;
