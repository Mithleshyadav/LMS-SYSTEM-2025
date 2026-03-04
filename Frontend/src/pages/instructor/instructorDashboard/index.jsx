import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Book, LogOut } from "lucide-react";
import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { toast } from "@/hooks/use-toast";


const InstructorCourses = lazy(() =>
  import("@/components/instructor-view/courses")
);

const InstructorDashboard = lazy(() =>
  import("@/components/instructor-view/dashboard")
);

const InstructorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const { handleLogout } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  /* -------------------- Fetch Courses -------------------- */

  const fetchAllCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchInstructorCourseListService();

      if (response?.success) {
        setInstructorCoursesList(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to load courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [setInstructorCoursesList]);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  /* -------------------- Menu Configuration -------------------- */

  const menuItems = useMemo(
    () => [
      {
        icon: BarChart,
        label: "Dashboard",
        value: "dashboard",
        component: (
          <InstructorDashboard
            listOfCourses={instructorCoursesList}
          />
        ),
      },
      {
        icon: Book,
        label: "Courses",
        value: "courses",
        component: (
          <InstructorCourses
            listOfCourses={instructorCoursesList}
          />
        ),
      },
    ],
    [instructorCoursesList]
  );

  const handleMenuClick = useCallback(
    (value) => {
      if (value === "logout") {
        handleLogout();
      } else {
        setActiveTab(value);
      }
    },
    [handleLogout]
  );

  const pageTitle = useMemo(() => {
    return activeTab === "courses"
      ? "Courses"
      : "Dashboard";
  }, [activeTab]);

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">
            Instructor View
          </h2>

          <nav>
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.value}
                className="w-full justify-start mb-2"
                variant={
                  activeTab === menuItem.value
                    ? "secondary"
                    : "ghost"
                }
                onClick={() =>
                  handleMenuClick(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}

            {/* Logout Button Separate */}
            <Button
              className="w-full justify-start mt-4"
              variant="ghost"
              onClick={() => handleMenuClick("logout")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {pageTitle}
          </h1>

          {loading ? (
            <div className="text-center py-10">
              Loading courses...
            </div>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
            >
              {menuItems.map((menuItem) => (
                <TabsContent
                  key={menuItem.value}
                  value={menuItem.value}
                >
                  <Suspense
                    fallback={
                      <div className="py-10 text-center">
                        Loading section...
                      </div>
                    }
                  >
                    {menuItem.component}
                  </Suspense>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;



// import { Tabs, TabsContent } from '@radix-ui/react-tabs'
// import { Button } from "@/components/ui/button"

// import { BarChart, Book, LogOut } from 'lucide-react'
// import { useContext, useState,useEffect } from "react"
// import { AuthContext } from "@/context/auth-context"
// import { InstructorContext } from "@/context/instructor-context"
// import InstructorCourses from "@/components/instructor-view/courses"
// import InstructorDashboard from "@/components/instructor-view/dashboard"
// import { fetchInstructorCourseListService } from '@/services'

// const InstructorDashboardpage = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const {handleLogout } = useContext(AuthContext);
//   const {instructorCoursesList, setInstructorCoursesList} = useContext(InstructorContext);

//   const menuItems =[
//     {
//       icon: BarChart,
//       label: "Dashboard",
//       value: "dashboard",
//       component: <InstructorDashboard  listOfCourses={instructorCoursesList}/>
//     },
//     {
//       icon: Book,
//       label: "Courses",
//       value: "courses",
//       component: <InstructorCourses  listOfCourses={instructorCoursesList}/>
//     },
//     {
//       icon: LogOut,
//       label: "Logout",
//       value: "logout",
//       component: null,
//     },
//   ];


//    async function fetchAllCourses() {
//       const response = await fetchInstructorCourseListService();
//       if (response?.success) setInstructorCoursesList(response?.data);
//     }
  
//     useEffect(() => {
//       fetchAllCourses();
//     }, []);
  
  
//   return (
//     <div className='flex h-full min-h-screen bg-gray-100'>
//       <aside className='w-64 bg-white shadow-md hidden md:block'>
//         <div className='p-4'>
//           <h2 className='text-2xl font-bold mb-4'>Instructor View</h2>
//           <nav>
//             {menuItems.map((menuItem)=> (
//               <Button
//               className='w-full justify-start mb-2'
//               key={menuItem.value}
//               variant={activeTab=== menuItem.value ? "secondary": "ghost"}
//                onClick={
//                 menuItem.value === 'logout' ? handleLogout : () => setActiveTab(menuItem.value)
//                }>
//              <menuItem.icon className='mr-2 h-4 w-4'/>
//              {menuItem.label}
//               </Button>
//             ))}
//           </nav>

//         </div>

//       </aside>
//       <main className='flex-1 p-8 overflow-y-auto'>
//         <div className='max-w-7xl mx=auto'>
//           <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             {menuItems.map((menuItem)=> (
//               <TabsContent key={menuItem.value} value={menuItem.value}>
//                 {menuItem.component !== null ? menuItem.component : null}
//               </TabsContent>
//             ))}

//           </Tabs>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default InstructorDashboardpage

