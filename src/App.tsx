import clsx from "clsx";
import { FC } from "react";
import { BrowserRouter, Link, Route, Routes, useMatch } from "react-router-dom";
import { StartTransition } from "./UseTransition";
import { Tearing } from "./Tearing";
import { UseDeferredValue } from "./UseDeferredValue";
import { isConcurrent } from ".";
import { Toggle } from "rsuite";
import { DataFetching } from "./DataFetching";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen flex">
        <div
          className="bg-gray-800 text-white p-5 w-full space-y-4"
          style={{ maxWidth: 250 }}
        >
          <div className="text-2xl font-bold">React 18 Demos</div>
          <ConcurrentModeSwitch />
          <Section title="Concurrent Rendering">
            <MenuItem path="/concurrent/use-deferred-value">useDeferredValue</MenuItem>
            <MenuItem path="/concurrent/use-transition">useTransition</MenuItem>
            <MenuItem path="/concurrent/tearing">Tearing</MenuItem>
          </Section>
          {/* <Section title="Suspense">
            <MenuItem path="/suspense/data-fetching">Data Fetching</MenuItem>
            <MenuItem path="/suspense/use-deferred-value">useDeferredValue</MenuItem>
            <MenuItem path="/suspense/use-transition">useTransition</MenuItem>
          </Section> */}
        </div>
        <div className="flex-1 bg-yellow-50 relative">
          <Routes>
            {/* <Route element={<Home />} index /> */}
            <Route path="/concurrent/use-deferred-value" element={<UseDeferredValue />} />
            <Route path="/concurrent/use-transition" element={<StartTransition />} />
            <Route path="/concurrent/tearing" element={<Tearing />} />
            <Route path="/suspense/data-fetching" element={<DataFetching />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const Section: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div>
      <div className="text-sm text-gray-300 mb-2">{title}</div>
      <div>{children}</div>
    </div>
  );
};

const MenuItem: FC<{ path: string }> = ({ path, children }) => {
  const isActive = useMatch(path);

  return (
    <Link
      to={path}
      className={clsx(
        "px-3 py-1.5 cursor-pointer hover:bg-white hover:bg-opacity-10 transition rounded-lg block text-white no-underline",
        isActive && "text-red-500",
      )}
    >
      {children}
    </Link>
  );
};

export default App;

const ConcurrentModeSwitch = () => {
  return (
    <div className="text-white py-3 font-bold flex justify-center items-center w-full space-x-2">
      <div>Concurrent mode is</div>
      <span
        className={clsx(
          isConcurrent() ? "bg-green-500" : "bg-red-500",
          "px-2 rounded-full",
        )}
      >
        {isConcurrent() ? "ON" : "OFF"}
      </span>
      <Toggle
        checked={isConcurrent()}
        onChange={(value) => {
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("concurrent", value ? "true" : "false");
          window.location.search = searchParams.toString();
        }}
      />
    </div>
  );
};
