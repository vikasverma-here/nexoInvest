// import { useEffect } from "react";
// import { io } from "socket.io-client";
// import { backendConfig } from "../constants/content/MainContent";

// const socket = io(backendConfig.origin);

// const CacheClearListener = () => {
//   useEffect(() => {
//     // Listen for Clear Cache Event
//     socket.on("clearCache", () => {
//       localStorage.clear();
//       sessionStorage.clear();
//       document.cookie.split(";").forEach((cookie) => {
//         document.cookie = cookie
//           .replace(/^ +/, "")
//           .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
//       });
//       window.location.reload(true);
//     });
//     return () => {
//       socket.off("clearCache");
//     };
//   }, []);

//   return null;
// };

// export default CacheClearListener;
