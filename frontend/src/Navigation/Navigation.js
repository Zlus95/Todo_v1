import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TodoPage from '../Todo/TotoPage';
import NotFound from '../NotFound/NotFound';


const Navigation = () => {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    )
}

export default Navigation;