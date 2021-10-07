import { Redirect, Route, Switch } from "react-router"
import NewStudent from "../CreateStudent/CreateStudents"
import Navbar from "../Navbar/Navbar"
import StudentTable from "../StudentsDetails/StudentTable"

export const Routes = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/students' />
                </Route>
                <Route exact path="/students">
                    <StudentTable />
                </Route>
                <Route exact path="/students/new">
                    <NewStudent />
                </Route>
                <Route exact path="/students/edit/:id">
                    <NewStudent />
                </Route>
            </Switch>
        </>
    )
}