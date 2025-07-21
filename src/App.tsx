import { Star } from "lucide-react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CharacterDetails } from "./components/CharacterDetails";
import HomePage from "./pages/HomePage";
function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/:id",
      element: <CharacterDetails />,
    },
  ]);
  console.log(window.location.pathname);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-black/20 backdrop-blur-sm border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
              <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
                Star Wars Database
              </h1>
            </div>
          </div>
        </div>
      </header>
      <RouterProvider router={routers} />;
    </div>
  );
}

export default App;
