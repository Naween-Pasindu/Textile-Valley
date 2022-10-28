
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';

// -----pages-------
import SignInSide from "./pages/SignInSide";
import SellerDashBoard from "./pages/SellerDashBoard";
// -----------------

function App() {
  return (
    <Box sx={{margin:"0"}}>
      <Routes>
      <Route path="/Textile-Valley/SignInSide" element={<SignInSide/>} />
      <Route path="/Textile-Valley/SellerDashBoard" element={<SellerDashBoard/>} />
      </Routes>
    </Box>
  );
}

export default App;
