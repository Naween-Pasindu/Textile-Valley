
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';

// -----pages-------
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
// -----------------

function App() {
  return (
    <Box sx={{margin:"0"}}>
      <Routes>
      <Route path="/Textile-Valley/SignInSide" element={<SignInSide/>} />
      <Route path="/Textile-Valley/SignUp" element={<SignUp/>} />
      </Routes>
    </Box>
  );
}

export default App;