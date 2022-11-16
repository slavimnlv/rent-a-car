import { Outlet } from 'react-router';
import './Main.scss'

export function Main() {
    return (
        <div className="main-content">
            <Outlet/>
        </div>
    );
}