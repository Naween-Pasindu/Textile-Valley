
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';

// -----pages-------
import SignInSide from "./pages/SignInSide";
// -----------------

function App() {
  return (
    <Box sx={{margin:"0"}}>
      <Routes>
      <Route path="/Textile-Valley/SignInSide" element={<SignInSide/>} />
      </Routes>
    </Box>
  );
}

export default App;
